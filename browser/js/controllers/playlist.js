app.controller('PlaylistCtrl', function ($scope, thePlaylist, PlaylistFactory, PlayerFactory) {
	
	$scope.playlist = thePlaylist;
	
	$scope.addSong = function (song) {
		return PlaylistFactory.addSong($scope.playlist._id, song)
		.then(function (addedSong) {
			$scope.playlist.songs.push(addedSong);
			return addedSong;
		});
	};

});