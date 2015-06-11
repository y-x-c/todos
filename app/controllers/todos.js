import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    'createTodo': function() {
      var record = this.store.createRecord('todo', {
        'title': this.get('newTitle'), // I suspect because the controller is the template-bound controller, so
        'isCompleted': false
      });
      record.save();
      this.set('newTitle', '');
    }
  }
});
