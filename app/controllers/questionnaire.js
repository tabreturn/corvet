import Ember from 'ember';

export default Ember.Controller.extend({
  
  firstname: '',
  surname: '',
  
  isDisabled: true,
  
  //isDisabled: Ember.computed.empty('firstname' && 'surname'),
  
  actions: {
    
    submit() {
      
      console.log({
          software      : document.getElementById('software').value,
          difficulties  : document.getElementById('difficulties').value,
          browser       : document.getElementById('browser').value,
          issues        : document.getElementById('issues').value,
          difficulty    : document.querySelector('input[name="difficulty"]:checked').value,
          traced        : document.querySelector('input[name="traced"]:checked').value;,
          time          : document.getElementById('time').value
      });
      
      /*
      Ember.$.post('/api/questionnaire', {
          software      : document.getElementById('software').value,
          difficulties  : document.getElementById('difficulties').value,
          browser       : document.getElementById('browser').value,
          issues        : document.getElementById('issues').value,
          difficulty    : document.getElementById('difficulty').value,
          traced        : document.getElementById('traced').value,
          time          : document.getElementById('time').value
        }).done(function(data) {
          console.log(data);
        }
      );*/
    }
    
  }
  
});
