import Ember from 'ember';

export default Ember.Component.extend({
  
  propertyObserver: Ember.observer('active', function(){
    Ember.$('#task' + this.active).addClass('active');
  })
  
});
