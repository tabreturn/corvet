// app/controllers/index.js
import Ember from 'ember';
//import EmberUploader from 'ember-uploader';

export default Ember.Controller.extend({
  
  emailAddress: '',
  
  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: Ember.computed.not('isValid'),
  
  actions: {
    postResult() {
      var user = 'tim' + Math.random();
      var task = 1;
      var result = 22;
      var req = new XMLHttpRequest();
      req.open('POST', '/api/results', true);
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      req.send(`user=${user}&task=${task}&score=${result}`);
    }
  }
  
});

/*
var assess = new Libcorvet('submission' + ' svg');
assess.getShapes();
*/
