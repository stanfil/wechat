const UserStatus = require('../model/userStatus');
const User = require('../model/user');
const constant = require('../config/constant');
const Validate = require('../tool/validate');

class Name {
    constructor() {
        this.validate = new Validate();
        this.realType = [{type: 'Text'}];
    }

    showText() {
        return {type: 'Text', info: '你在哪个城市？'};
    }

    handler(userId, message, callback) {
        if (this.validate.check(message.type, this.realType)){
            UserStatus.update({userId: userId}, {status: 'city'}, (err) => {
                if (err) {
                    return callback(err, null);
                }
            });
            User.create({userId: userId, name: message.text}, (err) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, this.showText())
            });
        } else {
            return callback(null, constant.validate.formatErr);
        }
    }
}

module.exports = Name;