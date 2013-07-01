var App = Ember.Application.create();

App.Router.map(function(){
  this.resource('files');
  this.resource('file', {path: '/file/:file_id'});
});

App.FilesRoute = Ember.Route.extend({
  model: function() {
    return FILES;
  }
});

App.FileRoute = Ember.Route.extend({
    model: function(params){
        return FILES[params.file_id];
    }
});

Ember.Handlebars.helper('markdown', function(value){
   var converter = new Showdown.converter();
    return new Handlebars.SafeString(converter.makeHtml(value));
});