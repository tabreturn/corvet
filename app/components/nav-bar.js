import Ember from 'ember';

export default Ember.Component.extend({
  
  propertyObserver: Ember.observer('active', function() {
    
    Ember.$('.nav li').removeClass('active');
    Ember.$('#task' + this.active).addClass('active');
    
    try {
      document.getElementById("task1").removeAttribute("id");
    }
    catch(e){}
  })
  
});
