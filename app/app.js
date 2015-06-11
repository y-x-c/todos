import Ember from 'ember';
import Resolver from 'ember/resolver';
import DS from "ember-data";
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  ApplicationAdapter: DS.LSAdapter.extend({
    namespace: 'todos'
  })
});

loadInitializers(App, config.modulePrefix);

export default App;
