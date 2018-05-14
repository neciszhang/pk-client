// 基础配置类
let _config = {
  host: 'https://localhost:8100/',
  //  host: 'https://miniprogram.onesmart.org/api/',
  // 答题倒记时
  time: 10,
  // 答题倒记进度条
  time_percent: 0,
  // 倒记时的全局setInvael变量
  down_time_tag: [],
  // 每道题的默认分值
  score: 20,
  //tap间隔触碰时间变量
  tap_time: 0,
  tap_time_min: 1000,
  // 5题积分多少过关
  score_pass: 70,
  // cache 标记
  cache_tag: 'AC_OPENID',
  power_code: {
    'max_理科': '但是你已站在科技的巅峰',
    'min_理科': '虽然你毫无逻辑可言',
    'max_文科': '但是你学富五车啊',
    'min_文科': '虽然你的想象力有点羞涩',
    'max_生活': '但是你处处引领潮流',
    'min_生活': '虽然你不是生活通',
    'max_娱乐': '但是你已站在流行的最前沿',
    'min_娱乐': '虽然你与时尚弄潮儿还有一定的差距',
    'max_英语': '但是你很懂歪果仁',
    'min_英语': '虽然你不太懂歪果仁的语言',
    'max_外语': '但是你很懂歪果仁',
    'min_外语': '虽然你不太懂歪果仁的语言',
    'max_语文': '但是你文思敏捷啊',
    'min_语文': '虽然你的文学细胞有点少',
    'max_数学': '但是你勤于思考啊',
    'min_数学': '虽然你的逻辑思维尚未觉醒'
  },
  msg_type: {
    // create: 'PK_START', // 组队完成
    pair_start: 'PAIR_START', // 开始匹配
    pair_lose: 'PAIR_LOSE', // 匹配失败
    pair_success: 'PAIR_SUCCESS', // 匹配完成
    pk_start: 'PK_START', // 开始游戏
    answer: 'ANSWER', // 答题互动
    success: 'SUCCESS', // 完成一轮游戏
    again: 'AGAIN', // 未关闭Socket，继续玩游戏
    user_quit: 'USER_QUIT', // 用户退出游戏
    firend_create_room: 'FIRENT_CREATE_ROOM', // 发起好友PK，创建房间
    firend_pk_start: 'FIREND_PK_START', // 通知好友发起方，可以开战了.
    firend_pk_start_again: 'FIREND_PK_START_AGAIN', // 好友对战，继续
    firend_pk_start_message: 'FIREND_PK_START_MESSAGE', // 通知好友发起方，可以开战了
    firend_pk_user_quit_message: 'FIREND_PK_USER_QUIT_MESSAGE', // 好友提前退场
    robot_start: 'ROBOT_START'
  }
};

export default {
  app: getApp(),
  // 包装全局配置类
  config: _config,
  // 基础req方法
  request(data, func) {
    let url = data.url;
    delete data.url;
    wx.request({
      url: this.config.host + url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        func(res);
      }
    });
    return;
  },
  get_api_setting: (url, data) => {
    return data.url = url, data;
  },
  share(func = null) {
    return {
      title: '你尽管答，全对算我输',
      imageUrl: getApp().cdn + '/share_kv.jpg',
      path: '/pages/app/home/home',
      success() {
        // getApp().aldstat.sendEvent('分享成功');
        console.log('分享成功');
        if (func) {
          func();
        }
      }
    }
  }
};