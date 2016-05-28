import Model from 'ember-data/model';
import attr from 'ember-data/attr';

let Test = Model.extend({
  src: attr('string')
});

Test.reopenClass({
  FIXTURES: [
    { id:1, src:'assets/images/tests/01-star.png' },
    { id:2, src:'assets/images/tests/02-triangle.png' },
    { id:3, src:'assets/images/tests/03-zigzag.png' },
    { id:4, src:'assets/images/tests/04-smiley.png' },
    { id:5, src:'assets/images/tests/05-text.png' },
    { id:6, src:'assets/images/tests/06-grid.png' }
  ]
});

export default Test;
