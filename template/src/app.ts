
import { app, IApp } from 'wxts'
const env = wx.getSystemInfoSync()
@app({ env })
export default class Application extends IApp implements wts.IApp {
    onLaunch() {
    }
    onShow() {
    }
    onHide() {
    }
}