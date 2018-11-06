import { page, IPage } from 'wxts'
import Hello from '../../widgets/hello/index'
const items = [{ title: "系统版本", key: "model" }, { title: "屏幕宽度", key: "screenWidth" }, { title: "屏幕高度", key: "screenHeight" }]
@page({ items })
export default class Index extends IPage implements wts.IPage {
    private hello: Hello
    onLoad() {
        this.hello = this.selectComponent('#hello')
    }
    sayWorld() {
        this.hello.sayWorld()
    }
}