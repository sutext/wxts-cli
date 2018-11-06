import { widget, Widget } from 'wxts'
@widget({ title: 'hello widget' })
export default class Index extends Widget implements wts.IComponent {
    sayWorld() {
        this.setData({ title: "hello world!!!" })
    }
}