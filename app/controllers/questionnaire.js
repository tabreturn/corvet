import Ember from 'ember';

export default Ember.Controller.extend({
  
  actions: {
    
    submit() {
      
      let result = {
          firstname     : sessionStorage.getItem('firstname'),
          surname       : sessionStorage.getItem('surname'),
          software      : document.getElementById('software').value,
          difficulties  : document.getElementById('difficulties').value,
          browser       : document.getElementById('browser').value,
          issues        : document.getElementById('issues').value,
          difficulty    : document.querySelector('input[name="difficulty"]:checked').value,
          traced        : document.querySelector('input[name="traced"]:checked').value,
          time          : document.getElementById('time').value
      };
      
      Ember.$.post( '/api/survey', result)
        .done(function(data) {
          console.log(data);
        }
      );
    }
    
  }
  
});
