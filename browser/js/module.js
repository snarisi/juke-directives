var app = angular.module('juke', ['ui.router', 'ngMessages']);

app.directive('sidebar', function () {
    return {
        restrict: 'E',
        templateUrl: '/templates/sidebar.html'
    }
});

app.directive('player', function (PlayerFactory) {
    return {
        restrict: 'E',
        templateUrl: '/templates/player.html',
        link: function (scope) {

            scope.getCurrentSong = PlayerFactory.getCurrentSong;
            scope.isPlaying = PlayerFactory.isPlaying;
            scope.forward = PlayerFactory.next;
            scope.back = PlayerFactory.previous;

            scope.getPercent = function () {
                return (100 * PlayerFactory.getProgress()) + '%';
            };

            scope.toggle = function () {
                if (PlayerFactory.isPlaying()) PlayerFactory.pause();
                else PlayerFactory.resume();
            };
        }
    };
});

app.directive('albumList', function () {
    return {
        restrict: "E",
        templateUrl: '/templates/album-list.html',
        scope: {
            albums: "="
        }
    };
});

app.directive('songList', function (PlayerFactory) {
    return {
        restrict: 'E',
        templateUrl: '/templates/song-list.html',
        scope: {
            songs: '=',
            doubleClick: '&'
        },
        link: function (scope, element) {
            scope.isCurrent = function (song) {
                var current = PlayerFactory.getCurrentSong();
                return current && current._id == song._id;
            };
            scope.start = function (song) {
                PlayerFactory.start(song, scope.songs);
            };

        }
    }
})

app.directive('doubleClick', function (PlayerFactory) {
    return {
        restrict: 'A',
        scope: {
            doubleClick: '&'
        },
        link: function (scope, element) {
            element.on('dblclick', function(){
                scope.doubleClick();
            })


        }
    }
})