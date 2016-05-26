import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: 'input',
  type: 'file',
  
  change: function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
      console.log(e.target.result);
      document.querySelector('#submission').innerHTML = reader.result;
    };
    reader.readAsText(file);
  }
});
