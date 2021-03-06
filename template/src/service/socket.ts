class Client extends wx.Socket.Client {
    protected buildurl(): string {
        return 'wss://example.com/socket/ws/customer?token=' + 'yourtoken';
    }
    protected get isLogin() {
        return true;
    }
    protected onClosed(evt: wx.SocketClose, reason: wx.Socket.Reason) {
        if (evt.code === 4001) {
            wx.pop.alert('您已在别处登录，请重新登录', () => {
                //TODO: logout logic
            });
        }
    }
    protected onMessage(msg: any) {
        this.emit('message', msg);
    }
}
export const client = new Client();
