#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');

function create(dir, appid) {
    var absdir = path.resolve(dir);
    var parsed = path.parse(absdir);
    if (fs.existsSync(absdir)) {
        throw new Error('File or directory already exist!!!');
    }
    if (!fs.existsSync(parsed.dir)) {
        fs.mkdirSync(parsed.dir);
    }
    var tempath = path.join(__dirname, 'template');
    console.log('creating project dir');
    spawn('cp', ['-r', tempath, absdir])
        .on('exit', function(code, signal) {
            if (code !== 0) {
                throw new Error('Can not create project at:' + absdir);
            }
            try {
                process.chdir(absdir);
                var pkgpath = path.join(absdir, 'package.json');
                var pkg = require(pkgpath);
                pkg.author = process.env.USER;
                pkg.name = parsed.name;
                pkg.keywords = ['wxts', parsed.name, 'typescript', '小程序'];
                pkg.description = `${parsed.name} suport by wxts`;
                fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 4));

                var confpath = path.join(absdir, 'src', 'project.config.json');
                var conf = require(confpath);
                conf.projectname = parsed.name;
                conf.description = pkg.description;
                if (appid) {
                    conf.appid = appid;
                }
                fs.writeFileSync(confpath, JSON.stringify(conf, null, 4));
                console.log('adding packges');
                spawn('npm', ['i', 'wxts', 'wxts-ui', 'tslib', '--save'], { stdio: 'inherit' }).on('exit', function() {
                    console.log('A new project created at :', absdir);
                });
            } catch (error) {
                fs.rmdirSync(absdir);
                throw error;
            }
        })
        .on('error', function(err) {
            throw err;
        });
}
function build(watch, dist) {
    var confpath = path.join(__dirname, 'gulpfile.js');
    var task = watch ? 'default' : 'nowatch';
    process.argv = process.argv.slice(0, 2);
    process.argv.push(task);
    process.argv.push('-f');
    process.argv.push(confpath);
    process.argv.push(`--cwd`);
    process.argv.push(process.cwd());
    if (dist) {
        process.env.BUILD_DIST = dist;
    }
    require('gulp-cli')();
}

program.version(require(path.join(__dirname, 'package.json')).version);

program
    .command('new <dir>')
    .description('Create an wexin miniprogram')
    .option('-a, --appid <appid>', 'The weixin miniprogram appid')
    .action(function(dir, cmd) {
        create(dir, cmd.appid);
    });

program
    .command('build')
    .description('build the miniprogram project')
    .option('-w, --watch', 'Using watch mode or not')
    .option('-d, --dist <dist>', 'The dist dir relative to project root. default is build')
    .action(function(cmd) {
        build(cmd.watch, cmd.dist);
    });

program.parse(process.argv);
