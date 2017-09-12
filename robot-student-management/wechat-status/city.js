const UserStatus = require('../model/userStatus');
const User = require('../model/user');
const constant = require('../config/constant');
const Validate = require('../tool/validate');

class City {
    constructor() {
        this.validate = new Validate();
        this.realType = [{type: 'Text'}];
        this.realCity = ['武汉','成都','北京','西安'];
    }

    showText(number) {
        if (number === '0') {
            return {type: 'add_member', groupname: `tws2期线上城市交流群`, info:'你在哪个大学？(务必输入大学全称哦～)'};
        } else {
            return {type: 'add_member', groupname: `tws2期线上${number}交流群`, info:'你在哪个大学？(务必输入大学全称哦～)'};
        }
    }

    handler(userId, message, callback) {
        if (this.validate.check(message.type, this.realType)) {
            UserStatus.update({userId: userId}, {status: 'school'}, (err) => {
                if (err) {
                    return callback(err, null);
                }
            });
            User.update({userId: userId}, {city: message.text}, (err) => {
                if (err) {
                    return callback(err, null);
                }
                if(this.validate.city(message.text, this.realCity)){
                    return callback(null, this.showText(message.text));
                } else {
                    return callback(null, this.showText('0'))
                }
            });
        } else {
            return callback(null, constant.validate.formatErr);
        }
    }
}

module.exports = City;