import { widget, Widget } from 'wxts'
@widget({ title: 'hello widget' })
export default class Index extends Widget implements wx.IComponent {
    sayWorld() {
        this.setData({ title: "hello world!!!" })
    }
}