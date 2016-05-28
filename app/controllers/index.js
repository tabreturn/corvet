// app/controllers/index.js
import Ember from 'ember';

// ember fixtures do not work:
/*
export default Ember.Route.extend({
  model() {
    return this.store.findAll('test');
  }
});
*/
// -- so global properties have been used to replace the model data

const test = [
  { id:1, src:'assets/images/tests/01-star.png' },
  { id:2, src:'assets/images/tests/02-triangle.png' },
  { id:3, src:'assets/images/tests/03-zigzag.png' },
  { id:4, src:'assets/images/tests/04-smiley.png' },
  { id:5, src:'assets/images/tests/05-text.png' },
  { id:6, src:'assets/images/tests/06-grid.png' }
];

let task = 0;

export default Ember.Controller.extend({
  
  tests: test,
  active: task,
  testsrc: test[task].src,
  nextdisabled: true,
  
  actions: {
    
    assessFile() {
      this.set('nextdisabled', false);
    },
    
    postResult() {
      Ember.$.post( '/api/results', { user:'tim'+Math.random(), task:1, score:22 })
        .done(function(data) {
          document.querySelector('#submission').innerHTML = '';
          Ember.$('html, body').animate({ scrollTop: 0 }, 200);
          console.log(data);
          task ++;
          this.set('testsrc', test[task].src);
          this.set('active', task);
        }
        .bind(this)
      );
    }
  }
  
});
