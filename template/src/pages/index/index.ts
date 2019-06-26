import { page, IPage, orm } from 'wxts';
import Poper from '../../widgets/poper-test/index'
import Popup from '../../widgets/popup-test/index'
import { net } from '../../service/network';
import { User } from '../../service/models';

@page({ rows: [1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1] })
export default class Index extends IPage implements wx.IPage {
    private popertest: Poper
    private popuptest: Popup
    onLoad() {
        this.popertest = this.selectComponent('#poper-test')
        this.popuptest = this.selectComponent('#popup-test')
        // net.objtask(User, 'user/info', { id: 'userid' })
        //     .then(user => {
        //         orm.save(user)
        //         console.log(user)
        //     })
        //     .catch(e => {
        //         console.log(e)
        //     })
    }
    poperTest() {
        this.popertest.toggle()
    }
    popupTest() {
        this.popuptest.toggle()
    }
    onTyping(e) {
        console.log(e.detail.value);
    }
    goBack(e) {
        console.log(e)
    }
}