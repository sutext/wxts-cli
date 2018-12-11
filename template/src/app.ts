
import { app, IApp } from 'wxts'
import { socket } from './libs/socket';
const env = wx.getSystemInfoSync()
@app({ env })
export default class Application extends IApp implements wts.IApp {
    onLaunch() {
        socket.addListener(this)
    }
    onShow() {
        socket.start()//启动socket 心跳 需配置正确socket 地址
    }
    onHide() {
        socket.stop()//停止socket
    }
    onMessage(json: any, isOffline: boolean) {
        console.log(json)
    }
}