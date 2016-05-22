// app/controllers/index.js
import Ember from 'ember';

/* ember fixtures do not work

export default Ember.Route.extend({
  model() {
    return this.store.findAll('test');
  }
});
*/

export default Ember.Controller.extend({
  
  actions: {
    
    postResult() {
      var user = 'tim' + Math.random();
      var task = 1;
      var result = 22;
      Ember.$.post( "/api/results", { user:user, task:task, score:result })
        .done(function( data ) {
          alert( "Data Loaded: " + data );
        });
    }
  }
  
});

/*
var assess = new Libcorvet('submission' + ' svg');
assess.getShapes();
*/
