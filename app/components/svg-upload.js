import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: 'input',
  type: 'file',
  disabled: true,
  
  propertyObserver: Ember.observer('browsedisabled', function() {
    Ember.$('.list-group-item [type=file]').val('');
    this.set('disabled', this.get('browsedisabled'));
  }),
  
  change: function(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function() {
      document.querySelector('#submission').innerHTML = reader.result;
      this.sendAction();
    }.bind(this);
    reader.readAsText(file);
  }
});
