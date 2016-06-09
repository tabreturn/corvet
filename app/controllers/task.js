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
  uploadedsvg: null,
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
      if (this.step < 3) {
        this.send('activateNextStep');
        this.send('activateNextStep');
        this.set('nextdisabled', false);
      }
      
      let submission = '#submission svg';
      let answer = '#answer' + this.taskactive;
      this.set('uploadedsvg', document.querySelector(submission).innerHTML);
      
      Ember.$('html, body').animate({ scrollTop: Ember.$(document).height() }, 500);
      
      let assess = new Libcorvet.Libcorvet(submission, '#answer1');
      assess.gatherSubmissionAnswer();
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
      
      Ember.$.post( '/api/results', { user:user, task:task, score:this.taskscore, svg:this.uploadedsvg })
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
