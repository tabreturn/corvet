import Ember from 'ember';

export default Ember.Controller.extend({
  
  actions: {
    
    submit() {
      alert('SUBMIT');
      Ember.$.post( '/api/results', { user:'u'+Date.now(), 'questions', score:99 })
        .done(function(data) {
            this.transitionToRoute('complete');
          }
        }
      );
    }
  }
  
});
