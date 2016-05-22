import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('questionnaire');
  this.route('task6');
  this.route('task5');
  this.route('task4');
  this.route('task3');
  this.route('task2');
  this.route('task1');
});

export default Router;
