
import { app, IApp } from 'wxts'
import { client } from './libs/socket';
const env = wx.getSystemInfoSync()
@app({ env })
export default class Application extends IApp implements wx.IApp {
    onLaunch() {
        client.on('message', this, this.onMessage)
    }
    onShow() {
        client.start()//启动socket 心跳 需配置正确socket 地址
    }
    onHide() {
        client.stop()//停止socket
    }
    onMessage(json: any, isOffline: boolean) {
        console.log(json)
    }
}