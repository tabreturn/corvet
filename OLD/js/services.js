'use strict';

corvet.service('messages', function(){
  var messages = {};
  messages.test = 'message service working';
  return messages;
});
