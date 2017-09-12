const UserStatus = require('../model/userStatus');
const User = require('../model/user');
const constant = require('../config/constant');
const Validate = require('../tool/validate');

class School {
    constructor() {
        this.validate = new Validate();
        this.realType = [{type: 'Text'}];
    }

    showText(school) {
        return {type: 'add_member', groupname: `${school}tws2期线上交流群`, info:''};
    }

    handler(userId, message, callback) {
        if (this.validate.check(message.type, this.realType)) {
            UserStatus.update({userId: userId}, {status: 'finish'}, (err) => {
                if (err) {
                    return callback(err, null);
                }
            });
            User.update({userId: userId}, {school: message.text}, (err) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, this.showText(message.text))
            });
        } else {
            return callback(null, constant.validate.formatErr);
        }
    }
}

module.exports = School;