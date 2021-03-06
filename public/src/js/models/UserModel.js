var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: 'api/users',
  idAttribute: '_id',

  defaults: {
    idn: '',
    is_student: false,
    is_admin: false,
    is_instructor: false,
    github: '',
    website: '',
    phone: '',
    username: '',
    first_name: '',
    last_name: '',
    courses: []
  },

  fullName: function() {
    return this.get('last_name') + ', ' + this.get('first_name');
  },

  roles: function() {
    var roles = [];
    if (this.get('is_client')) {
      roles.push('client');
    }
    if (this.get('is_admin')) {
      roles.push('admin');
    }
    if (this.get('is_instructor')) {
      roles.push('instructor');
    }
    if (this.get('is_student')) {
      roles.push('student');
    }
    return roles.join(', ');
  },

  parse: function(obj) {
    if (obj.courses) {
      var CoursesCollection = require('../collections/CoursesCollection');
      obj.courses = new CoursesCollection(obj.courses, { parse: true });
    }
    return obj;
  }
});
