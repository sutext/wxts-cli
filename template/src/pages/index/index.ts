import { page, IPage, storage } from 'wxts';
import Hello from '../../widgets/hello/index'
import { net } from '../../libs/network';
import { User } from '../../libs/models';
const items = [{ title: "系统版本", key: "model" }, { title: "屏幕宽度", key: "screenWidth" }, { title: "屏幕高度", key: "screenHeight" }]
@page({ items })
export default class Index extends IPage implements wts.IPage {
    private hello: Hello
    onLoad() {
        this.hello = this.selectComponent('#hello')
        net.objtask(User, 'user/info', { id: 'userid' })
            .then(user => {
                storage.save(user)
                console.log(user)
            })
            .catch(e => {
                console.log(e)
            })
    }
    sayWorld() {
        this.hello.sayWorld()
    }
}