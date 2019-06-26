
import { widget, Widget } from 'wxts'
import { modal } from 'wxts-ui'
@widget()
export default class Index extends Widget implements wx.IComponent {
    behaviors = [modal]
}