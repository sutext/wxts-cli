import { orm } from "wxts";

export class Asset {
    public readonly account: string
    public readonly balance: number
    constructor(json?: any) {
        if (!json) {
            return
        }
        this.balance = json.balance || 0
    }
}
@orm.store('User', 'account')
export class User {
    public readonly account: string
    public readonly nickname: string
    public readonly avatar: string
    public readonly phone: string
    @orm.field(Asset)
    public readonly asset: Asset
    constructor(json?: any) {
        if (!json) {
            return
        }
        Object.assign(this, json)
        this.asset = new Asset(json.asset)
    }
}