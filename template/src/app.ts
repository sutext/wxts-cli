import './config'
import { app, IApp } from 'wxts'
import { socket } from './service/socket';
const env = wx.getSystemInfoSync()
@app({ env })
export default class App extends IApp implements wx.IApp {
    onLaunch() {
        socket.on('message', this, this.onMessage)
    }
    onShow() {
        // socket.start()//启动socket 心跳 需配置正确socket 地址
    }
    onHide() {
        // socket.stop()//停止socket
    }
    onMessage(json: any, offline: boolean) {
        console.log(json)
    }
}