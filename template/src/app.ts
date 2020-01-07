import 'wxts';
import './config';
import { client } from './service/socket';
const env = wx.getSystemInfoSync();
@wx.app({ env })
export default class App extends wx.App {
    protected onLaunch() {
        client.on('message', this, this.onMessage);
    }
    protected onShow() {
        // client.start()//启动socket 心跳 需配置正确socket 地址
    }
    protected onHide() {
        // client.stop()//停止socket
    }
    protected onMessage(json: any, offline: boolean) {
        console.log(json);
    }
}
