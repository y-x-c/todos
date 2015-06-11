import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    //console.log(this.store.find('todo'));
    //return null;
    return this.store.find("todo");
    //return [
    //  {
    //    id: 1,
    //    title: 'First'
    //  },
    //  {
    //    id: 2,
    //    title: 'Second'
    //  },
    //  {
    //    id: 3,
    //    title: 'Third'
    //  }
    //];
  }
});
