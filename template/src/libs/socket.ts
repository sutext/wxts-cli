import * as wxts from "wxts";
class Socket extends wxts.Socket {
    protected maxAttemptTimes: number = 10 //config attemp times
    protected heartbeatInterval: number = 30//config heartbeat interval
    get url(): string {
        return "wss://example.com/socket/ws/customer?token=" + 'yourtoken'
    }
    get isDebug() {
        return true
    }
    get isLogin() {
        return true
    }
    didLogout() {
        wxts.pop.alert('您已在别处登录，请重新登录', () => {
            //TODO: logout logic
        })
    }
}
export const socket = new Socket()