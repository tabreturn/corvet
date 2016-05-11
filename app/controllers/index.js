// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',
  
  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: Ember.computed.not('isValid'),
  
  actions: {

    saveInvitation() {
      alert(`Saving of the following email address is in progress: ${this.get('emailAddress')}`);
      this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
      this.set('emailAddress', '');
    },
    
    postResult() {
      var user = 'tim' + Math.random();
      var task = 1
      var result = 22
      var req = new XMLHttpRequest();
      req.open('POST', '/api/results', true);
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      req.send('user='+user+'&task='+task+'&result='+result);
    }
    
  }

});



var assess = new libcorvet('submission' + ' svg');



/*
export default EmberUploader.FileField.extend({

  filesDidChange: function(files) {
    const uploader = EmberUploader.Uploader.create({
      url: this.get('url')
    });
 
    if (!Ember.isEmpty(files)) {
      // this second argument is optional and can to be sent as extra data with the upload 
      uploader.upload(files[0], { whatheverObject });
    }
  }

});
*/