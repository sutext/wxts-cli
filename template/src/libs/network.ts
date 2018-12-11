import * as wxts from "wxts";
class Network extends wxts.Network {
    protected get headers() { //config http headers
        const header: any = {}
        //if (session.isLogin) {
        //    header.token = session.token
        //}
        return header
    }
    protected get method(): wts.HttpMethod {
        //TODO: config the http method here
        return 'POST'
    }
    protected url(path: string) {//config url
        //TODO: config your full url here
        return "http://www.yourdom.com/xx/" + path
    }
    protected resolve(resp: any) {//resolve response data
        console.log(resp);
        if (resp.statusCode != 200) {//检查网络错
            throw new Error(resp.errMsg || "网络错误")
        }
        const obj = resp.data
        if (!obj.code) {
            throw new Error('服务异常')
        }
        if (obj.code === 'OK') {
            return obj.data || null
        }
        if (obj.code === 'AUTH_FAILED') {
            //TODO:service.logout()
        }
        throw new Error(obj.message || '系统错误')
    }
}
export const net = new Network()
