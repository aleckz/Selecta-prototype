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
var app = angular.module('Selecta', ["ngResource"])

app.controller('SongsCtrl', ["$resource", function($resource){
  var self = this;
  var searchResource = $resource("https://api.soundcloud.com/search/tracks")

  SC.initialize({
    client_id: '42998e70408d9b7fb7ca4e717ba94600'
  });

  self.doSearch = function(){
    console.log(self.searchTerm)
    SC.get('/tracks', { genres: self.searchTerm }, function(tracks) {
      $(tracks).each(function(index, track) {
        $('#results').append($('<li></li>').html(track.title + ' - ' + track.artwork_url));
      });
    });
  };
}]);
