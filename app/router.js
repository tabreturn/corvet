import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('questionnaire');
  this.route('task');
  this.route('complete');
});

export default Router;
