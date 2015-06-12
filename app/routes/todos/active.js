import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
      //var todos = this.store.find('todo');
      //console.log(todos);
      //return todos.filterBy('isCompleted', false);
      return this.get('store').filter('todo', function(todo) {
        return !todo.get('isCompleted');
      });
    },
    controllerName: 'todos'
});
