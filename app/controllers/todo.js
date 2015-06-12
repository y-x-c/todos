import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editTodo: function() {
      this.set('model.isEditing', true);
    },
    saveChanges: function() {
      if(this.get('model.title').trim().length) {
        this.model.save();
        this.set('model.isEditing', false);
      } else {
        this.send('removeTodo');
      }
    },
    removeTodo: function() {
      this.model.destroyRecord();
      this.set('model.isEditing', false);
    }
  }
});
