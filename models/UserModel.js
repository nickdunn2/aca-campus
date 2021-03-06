var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
  "username" : {
    type: String,
    required: true,
    unique: true,
    index: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  "password" : String,
  "is_super": {
    type: Boolean,
    default: false
  },
  "is_client" : {
    type: Boolean,
    default: false
  },
  "is_admin" : {
    type: Boolean,
    default: false
  },
  "is_instructor": {
    type: Boolean,
    default: false
  },
  "is_student": {
    type: Boolean,
    default: false
  },
  "first_name" : {
    type: String,
    default: ""
  },
  "last_name" : {
    type: String,
    default: ""
  },
  "phone": {
    type: String,
    default: ""
  },
  "github": {
    type: String,
    default: ""
  },
  "website": {
    type: String,
    default: ""
  },
  "idn": Number,
  "client" : {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  attendance: Array,
  codecademy: String,
  zipcode: String,
  photo: String,
  grades: Array,
  courses: [],
  reset_password: String
});

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    delete ret.client;
    delete ret.__v;
    delete ret.reset_password;
    return ret;
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
