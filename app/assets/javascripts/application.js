// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require angular
//= require angular-resource
//= require_tree .
var app = angular.module('Selecta', ["ngResource","ui.router"])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider


    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'SongsCtrl'
    })

    .state('track', {
      url: '/track/:songId',
      templateUrl: '/track.html',
      controller: 'TrackCtrl'
    });


  $urlRouterProvider.otherwise('home');
}]);

app.controller('SongsCtrl', ["$resource", function($resource){
  var self = this;

  SC.initialize({
    client_id: '42998e70408d9b7fb7ca4e717ba94600'
  });

  self.songs = [];

  self.doSearch = function(){
    if (self.searchTerm !== '') {
      return SC.get('http://api.soundcloud.com/tracks', { q: self.searchTerm }, function(tracks) {
      self.songs = tracks;
      console.log(self.songs);
    });
  }
};
}]);


app.controller('TrackCtrl', ["$resource", "$stateParams", function($resource, $stateParams){
  var self = this;
  var song = undefined;
  var playing = false;
  self.songId = $stateParams.songId;

  SC.initialize({
    client_id: '42998e70408d9b7fb7ca4e717ba94600'
  });

  SC.get("/tracks/" + self.songId, function(tracks){
    self.selected_song = tracks;
    console.log(self.selected_song);
  });

  self.play = function(){
    if (!song && !playing) {
      SC.stream("/tracks/" + self.songId, function(sound){
        song = sound
        sound.start();
        is_playing = true;
      });
    } else {
      console.log(playing);
      if (!playing) {
        song.play();
        playing = true;
      }
    }
  };

  self.stop = function(){
    song.pause();
    playing = false;
  };


}]);
