import bt from './bt';
import answer from './answer';
import setting from './setting'

const MSG_TYPE = setting.config.msg_type;

// const MSG_TYPE = {
//   // create: 'PK_START', // 组队完成
//   pair_start: 'PAIR_START', // 开始匹配
//   pair_lose: 'PAIR_LOSE', // 匹配失败
//   pair_success: 'PAIR_SUCCESS', // 匹配完成
//   pk_start: 'PK_START', // 开始游戏
//   answer: 'ANSWER', // 答题互动
//   success: 'SUCCESS', // 完成一轮游戏
//   again: 'AGAIN', // 未关闭Socket，继续玩游戏
//   user_quit: 'USER_QUIT', // 用户退出游戏
//   firend_create_room: 'FIRENT_CREATE_ROOM', // 发起好友PK，创建房间
//   firend_pk_start: 'FIREND_PK_START', // 通知好友发起方，可以开战了.
//   firend_pk_start_again: 'FIREND_PK_START_AGAIN', // 好友对战，继续
//   firend_pk_start_message: 'FIREND_PK_START_MESSAGE', // 通知好友发起方，可以开战了
//   firend_pk_user_quit_message: 'FIREND_PK_USER_QUIT_MESSAGE', // 好友提前退场
//   robot_start: 'ROBOT_START'
// }

var __message = function() {}

__message.prototype.handle = function(info, self) {
  this.self = self;
  this.question = JSON.parse(info.question);
  // this.question=this.question_list[0];
  this.self.room_id = info.room_id;
  this.self.otherPeople = info.members[1];
  // console.log(this.question_list);
  // console.log(this.question);
  this.apply();

  if (info.type == MSG_TYPE.pair_success) {
    wx.hideLoading();
    bt.toast('匹配完成,开始游戏', 1000);
    this.start_question();
  }
}
__message.prototype.apply = function() {
  this.self.$apply();
}
// 开始游戏
__message.prototype.start_question = function() {
  this.self.question_list = this.question;
  this.self.question_index = 0;
  this.self.isAnswer = false;
  this.self.choiceLeft = {
    'selectA': false,
    'selectB': false,
    'selectC': false,
    'selectD': false,
  };
  this.self.choiceRight = {
    'selectA': false,
    'selectB': false,
    'selectC': false,
    'selectD': false,
  };
  this.apply();

  this.animation_init();
  this.time_start();
}
// 倒记时开始
__message.prototype.time_start = function() {
  answer.time_down((time) => {
    this.self.time = time;
    this.apply();
  }, () => {
    if (this.self.question_index >= 4) {
      this.answer_over();
    } else {
      this.answer_next();
    }
  });
}
// 答题结束
__message.prototype.answer_over = function() {
  answer.clear_time();
  bt.toast('答题结束');
}
// 下一题
__message.prototype.answer_next = function() {
  this.self.question_index += 1;
  this.animation_init();
  this.self.answer_animat = '';
  this.self.isAnswer = false;
  this.self.choiceLeft = {
    'selectA': false,
    'selectB': false,
    'selectC': false,
    'selectD': false,
  };
  this.self.choiceRight = {
    'selectA': false,
    'selectB': false,
    'selectC': false,
    'selectD': false,
  };
  this.apply();

  setTimeout(() => {
    this.time_start();
  }, 2500)
}
// 开始动画
__message.prototype.animation_init = function() {
  setTimeout(() => {
    this.self.number_animat = 'number_go';
    this.apply();
  }, 500);
  setTimeout(() => {
    this.self.number_animat = 'number_go_clear';
    this.apply();
  }, 1500);
  setTimeout(() => {
    this.self.answer_animat = 'answer_go';
    this.apply();
  }, 2000);
}

module.exports = new __message();