import Ember from 'ember';

export default Ember.Controller.extend({
  
  firstname: '',
  surname: '',
  
  isDisabled: Ember.computed.empty('firstname' && 'surname'),
  
  actions: {
    
    begin() {
      this.transitionToRoute('task');
      localStorage.setItem('firstname', this.firstname);
      localStorage.setItem('surname', this.surname);
    }
    
  }
  
});
