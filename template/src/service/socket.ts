import { Socket, pop } from 'wxts';
class Client extends Socket.Client {
    protected buildurl(): string {
        return 'wss://example.com/socket/ws/customer?token=' + 'yourtoken';
    }
    protected get isLogin() {
        return true;
    }
    protected onClosed(evt: wx.SocketClose, reason: Socket.Reason) {
        if (evt.code === 4001) {
            pop.alert('您已在别处登录，请重新登录', () => {
                //TODO: logout logic
            });
        }
    }
    protected onMessage(msg: any) {
        this.observers.message.forEach(ele => ele.callback.call(ele.target, msg));
    }
}
export const client = new Client();
