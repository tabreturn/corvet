import Ember from 'ember';
import Libcorvet from 'corvet/lib/libcorvet';

// ember fixtures do not work:
/*
export default Ember.Route.extend({
  model() {
    return this.store.findAll('test');
  }
});
*/
// -- so global properties have been used to replace the model data:

const test = [
  { id:1, src:'assets/images/tests/01-star.png' },
  { id:2, src:'assets/images/tests/02-triangle.png' },
  { id:3, src:'assets/images/tests/03-zigzag.png' },
  { id:4, src:'assets/images/tests/04-smiley.png' },
  { id:5, src:'assets/images/tests/05-text.png' },
  { id:6, src:'assets/images/tests/06-grid.png' }
];

let task = 1;

export default Ember.Controller.extend({
  
  step: 1,
  tests: test,
  active: task,
  testsrc: test[task-1].src,
  steps: document.querySelectorAll('#steps li'),
  nextdisabled: true,
  browsedisabled: true,
  
  actions: {
    
    deactivateSteps() {
      Ember.$('#steps li:nth-child(2), #steps li:nth-child(3), #steps li:nth-child(4)')
        .addClass('disabled');
      
      this.set('nextdisabled', true);
    },
    
    activateNextStep() {
      document.querySelectorAll('#steps li')[this.step].classList.remove('disabled');
      this.step ++;
      this.set('browsedisabled', false);
    },
    
    assessFile() {
      this.send('activateNextStep');
      this.send('activateNextStep');
      this.set('nextdisabled', false);
      Ember.$('html, body').animate({ scrollTop: Ember.$(document).height() }, 500);
      
      let submission = '#submission svg';
      
      let assess = new Libcorvet.Libcorvet(submission);
      
      assess.getShapes();
      /*
      console.log('circles(' + assess.countShapes('circle') + '):');
      console.log(assess.circles);
      console.log('ellipse(' + assess.countShapes('ellipse') + '):');
      console.log(assess.ellipses);
      console.log('paths(' + assess.countShapes('path') + '):');
      console.log(assess.paths);
      console.log('rects(' + assess.countShapes('rect') + '):');
      console.log(assess.rects);
      */
      //assess.findCorners();
      
      console.log('compare first two circles:');
      console.log(assess.compareShape(assess.circles[0], assess.circles[1]));
      console.log('compare first two rects:');
      console.log(assess.compareShape(assess.rects[0], assess.rects[1]));
    },
    
    resetTask() {
      this.set('step', 1);
      this.set('testsrc', test[task-1].src);
      this.set('active', task);
      this.send('deactivateSteps');
      this.set('browsedisabled', true);
    },
    
    postResult() {
      Ember.$.post( '/api/results', { user:'u'+Date.now(), task:'task'+task, score:99 })
        .done(function(data) {
          document.querySelector('#submission').innerHTML = '';
          Ember.$('html, body').animate({ scrollTop: 0 }, 500);
          console.log(data);
          task ++;
          
          if (task > this.tests.length) {
            this.transitionToRoute('questionnaire');
          }
          else {
            this.send('resetTask');
          }
          
        }
        .bind(this)
      );
    }
  }
  
});
