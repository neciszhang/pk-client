import bt from './bt';
import answer from './answer';

const MSG_TYPE = {
    create : 'PK_START',// 组队完成
}

var __message = function(){  }

__message.prototype.handle = function( info ,self ){
	this.self = self;
	this.question = JSON.parse(info.question);
  // this.question=this.question_list[0];
	this.self.room_id = info.room_id;
  this.self.otherPeople=info.members[1];
  // console.log(this.question_list);
  // console.log(this.question);
  this.apply();

    if(info.type == MSG_TYPE.create){
      wx.hideLoading();
      bt.toast('匹配完成,开始游戏',2000);
      this.start_question();
    }
}
__message.prototype.apply = function(){
	this.self.$apply();
}
// 开始游戏
__message.prototype.start_question = function(){
	this.self.question_list = this.question;
	this.self.question_index = 0;
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
    	}else{
    		this.answer_next();
    	}
    });
  }
  // 答题结束
  __message.prototype.answer_over = function(){
  	answer.clear_time();
  	bt.toast('答题结束');
  }
 // 下一题
__message.prototype.answer_next = function() {
	this.self.question_index += 1;
	this.animation_init();
 	this.self.answer_animat = '';
 	this.apply();

    setTimeout(() => {
      this.time_start();
    }, 2500)
}
// 开始动画
__message.prototype.animation_init = function(){
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