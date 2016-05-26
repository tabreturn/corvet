import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: 'input',
  type: 'file',
  
  change: function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      document.querySelector('#submission').innerHTML = reader.result;
    };
    this.sendAction();
    reader.readAsText(file);
  }
});
