/*用户加机器人好友状态：数据库创建用户新状态，并给用户返回文本信息*/
const UserStatus = require('../model/userStatus');

class Info {
  showText() {
    return {
      type: 'Text', info: `芝麻开门，暗号是什么？`
    };
  }

  handler(userId, message, callback) {
    UserStatus.create({userId: userId, status: 'checkcode'}, (err) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, this.showText());
    });
  }
}

module.exports = Info;