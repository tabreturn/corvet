import Ember from 'ember';

export default Ember.Controller.extend({
  
  actions: {
    
    begin() {
      actions: this.transitionToRoute('task');
    }
    
  }
  
});
