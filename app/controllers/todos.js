import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    'createTodo': function() {
        if(!this.get('newTitle').trim()) return;

        var record = this.store.createRecord('todo', {
          'title': this.get('newTitle'), // I suspect because the controller is the template-bound controller, so
          'isCompleted': false
        });
        record.save();
        this.set('newTitle', '');
    }
  },

  remaining: function() {
    var todos = this;
    var remaining = todos.filterBy('isCompleted', false).get('length');
    return remaining;
  }.property('@each.isCompleted'),

  inflection: function(){
    return this.get('remaining') == 1? 'item left' : 'items left';
  }.property('remaining'),

  isAllCompleted: function(key, value) {

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
    return result.length == 0;
  }.property('@each.isCompleted')
});
