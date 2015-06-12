import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
      return this.get('store').filter('todo', function(todo) {
        return !todo.get('isCompleted');
      });
    },
    controllerName: 'todos'
});
