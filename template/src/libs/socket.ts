import { Socket, pop } from "wxts";
class Client extends Socket.Client {
    buildurl(): string {
        return "wss://example.com/socket/ws/customer?token=" + 'yourtoken'
    }
    get isDebug() {
        return true
    }
    get isLogin() {
        return true
    }
    onClosed(evt: wx.SocketClose) {
        if (evt.code === 4001) {
            pop.alert('您已在别处登录，请重新登录', () => {
                //TODO: logout logic
            })
        }
    }
    onFailed(evt: wx.SocketClose) {
        pop.alert('重联失败')
    }
    onMessage(msg: any) {
        this.observers.message.forEach(ele => ele.callback.call(ele.target, msg))
    }
}
export const client = new Client()