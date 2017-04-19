'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

var validateLocalStrategyNumberID = function(number) {
	return (this.provider !== 'local' || (number && number.length == 13));
};
var validateLocalStrategyNumberTel = function(number) {
	return (this.provider !== 'local' || (number && number.length == 10));
};
/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	titleName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your title name']
	},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	username: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username',
		trim: true
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
	idnumber: {
		type: String,
		validate: [validateLocalStrategyNumberID, 'เลขบัตรประชาชนไม่ถูกต้อง']
	},
	userpicture: {
		type: String
	},
	bday: {
		type: Date,
		
	},
	tel: {
		type: String,
		validate: [validateLocalStrategyNumberTel, 'เบอร์โทรไม่ถูกต้อง']
	},
	address: {
		type: String
	},
	typeofwork: {
		type: String
	},
	positionofwork: {
		type: String
	},
	salaryprefer_min: {
		type: String
	},
	salaryprefer_max: {
		type: String
	},
	provinceprefer: {
		type: String
	},
	exp_company: {
		default:'',
		type: String
	},
	exp_position: {
		default:'',
		type: String
	},
	exp_start: {
		default:'',
		type: Date
	},
	exp_end: {
		default:'',
		type: Date
	},
	distype: {
		type: String
	},
	disdetail: {
		type: String
	},
	edulevel: {
		type: String
	},
	educountry: {
		type: String
	},
	eduinstitute: {
		type: String
	},
	edufaculty: {
		type: String
	},
	edumajor: {
		type: String
	},
	eduyeargrad: {
		type: String
	},
	edugpa: {
		type: String
	},
	eduprize: {
		type: String
	},
	edulang: {
		type: String
	},
	edutalent: {
		type: String
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);