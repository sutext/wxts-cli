var gulp = require('gulp');
var path = require('path');
var fs = require("fs");
var ts = require("gulp-typescript");
var clean = require('gulp-clean')
var tsProject = ts.createProject("tsconfig.json");
dist = process.env.BUILD_DIST || 'build'
gulp.task('clean', function () {
    return gulp
        .src(dist, { read: false, allowEmpty: true })
        .pipe(clean())
})
gulp.task("build", function () {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(dist));
});
gulp.task('copy', function () {
    return gulp
        .src(['**/*', '!**/*.ts',], { base: 'src' })
        .pipe(gulp.dest(dist))
});
var cwd = process.cwd()
var rename = require("gulp-rename");
var dpds = require(path.join(cwd, `/package.json`)).dependencies
var mtasks = Object.keys(dpds)
mtasks.forEach(function (pname) {
    var ppath = `node_modules/${pname}`
    if (fs.existsSync(`${ppath}/miniprogram_dist`)) {
        var dist_dir = `${ppath}/miniprogram_dist`
        gulp.task(pname, function () {
            return gulp
                .src(`${dist_dir}/**/*`)
                .pipe(gulp.dest(`${dist}/miniprogram_npm/${pname}`));
        })
    } else {
        var pkg = require(path.join(cwd, `${ppath}/package.json`))
        var main_path = path.join(ppath, pkg.main || 'index.js')
        var main_parsed = path.parse(main_path)
        var main_name = main_parsed.base
        var main_dir = main_parsed.dir
        gulp.task(pname, function () {
            return gulp
                .src([`${main_dir}/${main_name}`])
                .pipe(rename({ dirname: "", basename: "index", extname: ".js" }))
                .pipe(gulp.dest(`${dist}/miniprogram_npm/${pname}`));
        })
    }
})
gulp.task('watch', function () {
    gulp.watch('src/**/*').on('change', function (file) {
        var parsed = path.parse(file)
        var ary = parsed.dir.split('src/')
        var src = `${parsed.base}`
        if (ary.length > 1) {
            src = `${ary[1]}/${src}`
        }
        if (parsed.ext === '.ts') {
            console.log('building file:', file);
            gulp
                .src([`**/${src}`], { base: 'src' })
                .pipe(tsProject()).js
                .pipe(gulp.dest(dist))
        } else {
            console.log('copying file:', file);
            gulp
                .src(`**/${src}`, { base: 'src' })
                .pipe(gulp.dest(dist));
        }
    })
})
gulp.task('default',
    gulp.series('clean', gulp.parallel('build', 'copy', mtasks), 'watch')
);
gulp.task('nowatch',
    gulp.series('clean', gulp.parallel('build', 'copy', mtasks))
);