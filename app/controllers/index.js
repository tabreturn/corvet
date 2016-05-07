// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({

  headerMessage: 'Coming Soon',
  responseMessage: '',
  emailAddress: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: Ember.computed.not('isValid'),

  actions: {

    saveInvitation() {
      const email = this.get('emailAddress');

      const newInvitation = this.store.createRecord('invitation', { email: email });
      newInvitation.save();

      this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
      this.set('emailAddress', '');
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