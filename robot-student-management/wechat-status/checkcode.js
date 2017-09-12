const UserStatus = require('../model/userStatus');
const constant = require('../config/constant');
const Validate = require('../tool/validate');

class Checkcode {
  constructor() {
    this.validate = new Validate();
    this.realType = [{type: 'Text'}];
  }

  showText(number) {
    if (number === 0) {
      return {type: 'add_member', groupname: '思特沃克特训营第二期咨询群', info: ''};
    } else if (number === 1) {
      return {type: 'Text', groupname: 'tws2期线上交流大群', info: '你的名字是什么？'};
    }
  }

  handler(userId, message, callback) {
    if (this.validate.check(message.type, this.realType) && message.text === 'q') {
      return callback(null, this.showText(0));
    } else if (this.validate.check(message.type, this.realType) && message.text==='tws第二期') {
      UserStatus.update({userId: userId}, {status: 'name'}, (err) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, this.showText(1));
      });
    } else {
      return callback(null, constant.validate.err);
    }
  }
}

module.exports = Checkcode;