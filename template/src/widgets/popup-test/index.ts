import { modal } from 'wxts-ui';
@wx.widget()
export default class Index extends wx.Widget implements wx.IComponent {
    behaviors = [modal];
}
