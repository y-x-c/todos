import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return [
      {
        id: 1,
        title: 'First'
      },
      {
        id: 2,
        title: 'Second'
      },
      {
        id: 3,
        title: 'Third'
      }
    ];
  }
});
