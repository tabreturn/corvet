import Ember from 'ember';

export default Ember.Controller.extend({
  
  firstname: '',
  surname: '',
  
  isDisabled: Ember.computed.empty('firstname' && 'surname'),
  
  actions: {
    
    begin() {
      this.transitionToRoute('task');
      sessionStorage.setItem('firstname', this.firstname);
      sessionStorage.setItem('surname', this.surname);
    }
    
  }
  
});
