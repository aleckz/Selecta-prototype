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
      controller: 'TrackCtrl'
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

  self.clearList = function(){
    self.songs = '';
  };
}]);


song = false;

app.controller('TrackCtrl', ["$resource", "$location", "$scope", "$window", 'Song', 'FindSong', 'SongsUser', "$stateParams","$timeout", "$state", "$rootScope",function($resource, $location, $scope, $window, Song, FindSong, SongsUser, $stateParams, $timeout, $state, $rootScope){
  var self = this;
  var playing = false;

  self.songId = $stateParams.songId;

  SC.initialize({
    client_id: '42998e70408d9b7fb7ca4e717ba94600'
  });

  SC.get("/tracks/" + self.songId, function(tracks){
    self.selected_song = tracks;
    $scope.$apply();
  });

  self.test = function() {
    test = FindSong.find({soundcloud_id: self.selected_song.id});
    console.log(test);
    test.$promise.then(function(song){
      console.log(song.song);
    });
    $state.go('track', {songId: 43891342});
    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
      self.songId = toParams.songId;
      self.play();
    });
  };

  self.play = function(){
  if (song) {
    var temp = song;
  }
    SC.stream("/tracks/" + self.songId,{onfinish: function(){ self.next();}}, function(sound){
      song = sound;
      if (temp) {
        if (song.url != temp.url) {
          temp.stop();
          song.start();
          playing = true;
        } else {
          song = temp;
          if (!playing) {
            song.play();
          }
        }
      } else {
        if (!playing) {
          song.play();
          playing = true;
        }
      }
    });
  };

  self.stop = function(){
    song.pause();
    playing = false;
  };

  self.like = function(){
    SongsUser.create({soundcloud_id: self.songId});

  };

  self.next = function() {
    SC.get("/tracks/63848640", function(tracks){
      self.newsong = tracks;
      $scope.$apply();
    });
  };

}]);


app.factory('SongsUser', ['$resource',function($resource){
  return $resource('/songs.json', {},{
  query: { method: 'GET', isArray: true },
  create: { method: 'POST' }
  });
}]);

app.factory('Song', ['$resource', function($resource){
  return $resource('/songs/:id.json', {}, {
  show: { method: 'GET'},
  find: { method: 'POST', params: {id: '@id'} },
  update: { method: 'PUT', params: {id: '@id'} },
  delete: { method: 'DELETE', params: {id: '@id'} }
 });
}]);

app.factory('FindSong', ['$resource', function($resource){
  return $resource('/songs/find.json', {}, {
  find: { method: 'POST' },
 });
}]);
