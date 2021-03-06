var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
require('react.backbone');
var UserItemComponent = React.createFactory(require('./UserItemComponent'));
var UserModalComponent = React.createFactory(require('./UserModalComponent'));
var UserModel = require('../models/UserModel');

module.exports = React.createBackboneClass({


  newUserModal: function() {
    ReactDOM.unmountComponentAtNode($('#modal-container')[0]);
    ReactDOM.render(UserModalComponent({
      collection: this.getCollection(),
      model: new UserModel()
    }), $('#modal-container')[0]);
    $('#user-modal').openModal();
  },

  render: function() {
    var that = this;
    var userItems = this.getCollection().map(function(user) {
      return UserItemComponent({
        model: user,
        collection: that.getCollection()
      });
    });

    return (
      <div className="row">
        <div className="col s12">
          <br />
          <a className="waves-effect waves-teal btn modal-trigger" onClick={this.newUserModal}><i className="material-icons left">add</i> user</a>
          <br />
          <table>
            <thead>
              <tr>
                <th>IDN</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role(s)</th>
              </tr>
            </thead>
            <tbody>
              {userItems}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
