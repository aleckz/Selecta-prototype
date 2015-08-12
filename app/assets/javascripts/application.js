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
    })

    .state('songs', {
      url: '/songs',
      templateUrl: '/songs/index.html.erb',
      controller: 'SongListCtrl'
    })

    .state('NewSongs', {
      url: '/songs/new',
      templateUrl: '/songs/index.html.erb',
      controller: 'SongListCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.controller('SongsCtrl', ["$resource", "$scope", function($resource, $scope){
  var self = this;

  SC.initialize({
    client_id: '42998e70408d9b7fb7ca4e717ba94600'
  });

  self.songs = [];

  self.doSearch = function(){
    if (self.searchTerm !== '') {
      return SC.get('http://api.soundcloud.com/tracks', { q: self.searchTerm }, function(tracks) {
        self.songs = tracks;
        $scope.$apply();
    });
  }
};
}]);


app.controller('TrackCtrl', ["$resource","$scope", 'Song', 'Songs', 'User', 'Users', "$stateParams", function($resource, $scope, Song, Songs, User, Users, $stateParams){
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
    $scope.$apply();
  });

  self.play = function(){
    if (!song && !playing) {
      SC.stream("/tracks/" + self.songId, function(sound){
        song = sound;
        sound.start();
        playing = true;
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

  self.like = function(){
    self.user = Songs.query();
    console.log(self.user);
    // self.user.songs.create({soundcloud_id: self.songId});
  };

}]);



app.controller("SongListCtrl", ['$resource', 'Songs', 'Song', '$location', function($resource, Songs, Song, $location) {
  var self = this;
  self.songs = Songs.query(); //it's getting user collection
  console.log(self.songs);
}]);

app.factory('Songs', ['$resource',function($resource){
  return $resource('/songs.json', {},{
  query: { method: 'GET', isArray: true },
  create: { method: 'POST' }
  });
}]);

app.factory('Song', ['$resource', function($resource){
  return $resource('/songs/:id.json', {}, {
  show: { method: 'GET' },
  update: { method: 'PUT', params: {id: '@id'} },
  delete: { method: 'DELETE', params: {id: '@id'} }
 });
}]);

app.factory('Users', ['$resource',function($resource){
  return $resource('/users.json', {},{
  query: { method: 'GET', isArray: true },
  create: { method: 'POST' }
  });
}]);

app.factory('User', ['$resource', function($resource){
  return $resource('/users/:id.json', {}, {
  show: { method: 'GET' },
  update: { method: 'PUT', params: {id: '@id'} },
  delete: { method: 'DELETE', params: {id: '@id'} }
 });
}]);
