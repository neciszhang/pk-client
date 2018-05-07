// 题目接口
import wepy from 'wepy'
import setting from '../setting';

var get = setting;
var api = get.get_api_setting;

export default {
  get_rand(data) {
    return new Promise(function(Resolved){
      return get.request(api('question/get_rand', data), res =>{
        Resolved(res);
      });
    });
  },
  get_setting() {
    return new Promise(function(Resolved){
      return get.request(api('setting/config', []), res =>{
        Resolved(res);
      });
    });
  }
}