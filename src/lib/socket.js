import bt from './bt';
import message from './message';

var __socket = function() {}

__socket.prototype.init = function(openid = null, self) {
    if (openid) {
        this.openid = openid;
        this.self = self;
        this.userInfo = this.self.userInfo;
    }
    this.socketStatus = false;
    this.connection();
}

__socket.prototype.connection = function() {
    bt.log('正在链接socket');
    wx.connectSocket({
        // url: 'wss://socket.5i5s.net?openid=' + this.openid,
        url: 'wss://localhost:8100',
        header: {
            'openid': this.openid,
            'avatarUrl': this.userInfo.avatarUrl,
            'nickName': this.userInfo.nickName,
            'status': 'on'
        },
    });
    wx.onSocketOpen((res) => {
        this.socketStatus = true;
        wx.showLoading({
            title: '正在匹配选手...',
            mask: true
        });
    });
    // 接受消息进行页面相应显示
    wx.onSocketMessage((res) => {
        this.self.message_handle(JSON.parse(res.data));
    })
}
// 发送消息
__socket.prototype.send = function(message) {
    if (this.socketStatus) {
        wx.sendSocketMessage({
            data: JSON.stringify(message)
        });
        bt.log('send success');
    } else {
        console.log('socket open failure');
    }
}

module.exports = new __socket();