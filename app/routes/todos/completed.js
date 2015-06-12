import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var todos = this.store.find('todo');
        //return todos.filterBy('isCompleted', true);
        return this.store.filter('todo', function(todo) {
          return todo.get('isCompleted');
        });
    },
    controllerName: 'todos'
});
