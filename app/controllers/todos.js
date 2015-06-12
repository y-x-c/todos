import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    'createTodo': function() {
      if(!this.get('newTitle').trim()) {
        return;
      }

      var record = this.store.createRecord('todo', {
        'title': this.get('newTitle'), // I suspect because the controller is the template-bound controller, so
        'isCompleted': false
      });
      record.save();
      this.set('newTitle', '');
    },

    'clearCompleted': function() {
      this.filterBy('isCompleted', true).forEach(function(todo) {
        todo.destroyRecord();
      });
    }
  },

  remaining: function() {
    var remaining = this.filterBy('isCompleted', false).length;
    return remaining;
  }.property('@each.isCompleted'),

  completed: function() {
    var completed = this.filterBy('isCompleted', true).length;
    return completed;
  }.property('@each.isCompleted'),

  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),

  inflection: function(){
    return this.get('remaining') === 1? 'item left' : 'items left';
  }.property('remaining'),

  areAllCompleted: function(key, value) {

    if(arguments.length > 1) {
      //this.get('model').forEach(function(todo) {
      //  todo.set('isCompleted', value);
      //})
      // the following method is more brief than above
      this.setEach('isCompleted', value);

      // save is sent to each model not controller, so invoke('model.save') is incorrect
      this.invoke('save');
    }

    var result = this.filterBy('isCompleted', false);
    return this.get('length') && result.length === 0;
  }.property('@each.isCompleted')
});
