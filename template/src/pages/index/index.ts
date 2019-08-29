import Poper from '../../widgets/poper-test/index';
import Popup from '../../widgets/popup-test/index';
import { net } from '../../service/network';
import { User } from '../../service/models';

@wx.page({ rows: [1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1] })
export default class Index extends wx.Page implements wx.IPage {
    private popertest: Poper;
    private popuptest: Popup;
    onLoad() {
        this.popertest = this.selectComponent('#poper-test');
        this.popuptest = this.selectComponent('#popup-test');
        // net.objtask(User, 'user/info', { id: 'userid' })
        //     .then(user => {
        //         orm.save(user)//可直接获得结构化的模型
        //         console.log(user)
        //         return arytask(User, 'user/friends')
        //     }).then(users => {
        //         console.log(users)//可直接获得结构化的模型
        //     })
        //     .catch(e => {
        //         console.log(e)
        //     })
    }
    poperTest() {
        this.popertest.toggle();
    }
    popupTest() {
        this.popuptest.toggle();
    }
    onTyping(e) {
        console.log(e.detail.value);
    }
    goBack(e) {
        console.log(e);
    }
}
