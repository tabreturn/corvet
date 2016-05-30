import Ember from 'ember';

export default Ember.Controller.extend({
  
  firstname: '',
  surname: '',
  
  isDisabled: false,
  
  //isDisabled: Ember.computed.empty('firstname' && 'surname'),
  
  actions: {
    
    submit() {
      alert('result');
    }
    
    /*
    inputs = document.getElementsByTagName('select');
    for (index = 0; index < inputs.length; ++index) {
      console.log(Ember.$(inputs[index]).val());
    }
    
    inputs = document.getElementsByTagName('textarea');
    for (index = 0; index < inputs.length; ++index) {
        console.log(Ember.$(inputs[index]).val());
    }
    
    inputs = document.getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
        if (inputs[index].checked) {
            console.log(Ember.$(inputs[index]).val());
        }
    }
    
    */
    
    /*
    submit() {
      
      alert({ user:'u'+Date.now(), 'questions', score:99 });
      
      Ember.$.post( '/api/results', { user:'u'+Date.now(), 'questions', score:99 })
        .done(function(data) {
            this.transitionToRoute('complete');
          }
        }
      );
      
    }*/
  }
  
});
