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
  { id:1, src:'01-star' },
  { id:2, src:'02-triangle' },
  { id:3, src:'03-zigzag' },
  { id:4, src:'04-smiley' },
  { id:5, src:'05-text' },
  { id:6, src:'06-grid' }
];

let task = 1;

export default Ember.Controller.extend({
  
  step: 1,
  tests: test,
  
  taskactive: task,
  taskscore: 0,
  tasksvg: null,
  tasksrc: test[task-1].src,
  
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
      
      let submission = '#submission';
      this.set('tasksvg', document.querySelector(submission).innerHTML);
      
      let answer = document.getElementById("answer");
      answer = answer.contentDocument;
      
      window.submission = submission;
      window.answer = answer;
      
      let assess = new Libcorvet.Libcorvet(submission+' svg', answer.querySelector('svg'));
      
      assess.gatherSubmissionAnswer();
      
      //console.log('circles(' + assess.countShapes('circle') + '):');
      //console.log(assess.circles);
      //console.log('ellipse(' + assess.countShapes('ellipse') + '):');
      //console.log(assess.ellipses);
      //console.log('paths(' + assess.countShapes('path') + '):');
      //console.log(assess.paths);
      //console.log('rects(' + assess.countShapes('rect') + '):');
      //console.log(assess.rects);
      
      //assess.findCorners();
      
      //console.log(assess.circles);
      //console.log(assess.polygons);
      //console.log(assess.polylines);
      //console.log(assess.rects);
      //console.log(assess.ellipses);
      
      //console.log('compare first two circles:');
      //console.log(assess.compareShape(assess.circles[0], assess.circles[1]));
      //console.log('compare first two rects:');
      //console.log(assess.compareShape(assess.rects[0], assess.rects[1]));
    },
    
    resetTask() {
      this.set('step', 1);
      this.set('tasksrc', test[task-1].src);
      this.set('taskactive', task);
      this.send('deactivateSteps');
      this.set('browsedisabled', true);
    },
    
    postResult() {
      let user = sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('surname');
      
      Ember.$.post( '/api/results', { user:user, task:task, score:this.taskscore, svg:this.tasksvg })
        .done(function(data) {
          document.querySelector('#submission').innerHTML = '';
          Ember.$('html, body').animate({ scrollTop: 0 }, 500);
          console.log(data.substring(0, 99));
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
