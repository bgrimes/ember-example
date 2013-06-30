var App = Ember.Application.create();

App.Router.map(function(){
  this.resource('files');
});

App.FilesRoute = Ember.Route.extend({
  model: function() {
    return FILES;
  }
});