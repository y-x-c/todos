import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    },
    saveChanges: function() {
      if(this.get('model.title').trim().length) {
        this.model.save();
        this.set('isEditing', false);
      } else {
        this.send('removeTodo');
      }
    },
    removeTodo: function() {
      this.model.destroyRecord();
      this.set('isEditing', false);
    },
    details: function() {
      if(this.get('model.isCompleted')) return;
      this.transitionToRoute('todo', this.get('model'));
    },
    onClick: function() {
      var e = this.get('clickEvent');

      if(e === null) {
        e = Ember.run.later(this, function() {
          this.send('details');
          this.set('clickEvent', null);
        }, 300);

        this.set('clickEvent', e);
      } else {
        Ember.run.cancel(e);
        this.set('clickEvent', null);
        this.send('editTodo');
      }
    }
  },

  clickEvent: null,

  isEditing: false,

  isCompleted: function(key, value) {
    if(arguments.length > 1) {
      this.set('model.isCompleted', value);
      this.model.save();
    }
    return this.get('model.isCompleted');
  }.property('model.isCompleted')
});
