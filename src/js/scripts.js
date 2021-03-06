(function ($, window, document, undefined) {

	'use strict';
	var CLIENT_ID = 'c65d774dc008030d7baf91fa4030b1f6';
  var PLAYLIST = '94097386';
  var SECRET_TOKEN = 's-Mq3BZ';
  var SINGLE_ONLY = true;
  var BPMS = [
    60,
    60,
    116,
    130,
    140,
    140,
    132,
    129,
    64,
    74
  ];

	$(function () {
    function Player(tracks) {
      var self = this;
      var notFirstPlay = false;
      var currTrackId = SINGLE_ONLY ? 1 : 0;
      var currTrack;
      var currTrackDuration = 0;
      var totalTracks = tracks.length;
      var trackName = $('.track-name');
      var gif = $('x-gif');
      loadTrack(currTrackId);

      function loadTrack(trackId) {
        gif.attr('stopped',true);
        // console.log(currTrack);
        if (currTrack && currTrack._player) {
          currTrack._player.kill();
        }

        var track = tracks[trackId];
        trackName.text(track.title);
        gif.attr('bpm', track.bpm);
        SC.stream('/tracks/' + track.id + '?secret_token=' + SECRET_TOKEN, {
            onfinish: function() {
              console.log('Fine');
              next();
            }
          }, function(sound){
            // console.log(sound);
            currTrack = sound;

            $(sound._player._html5Audio).on('play', function() {
              gif.removeAttr('stopped');
            });

            if (!SINGLE_ONLY) {
              $(sound._player._html5Audio).on('ended', next);
            } else {
              $(sound._player._html5Audio).on('ended', togglePause);
            }

            if (notFirstPlay) {
              togglePlay();
            }
          }
        );
      }

      function togglePlay() {
        play.addClass('hidden');
        pause.removeClass('hidden');
        if (!notFirstPlay) {
          notFirstPlay = true;
        }
        // gif.removeAttr('stopped');
        currTrack.play();
      }

      function togglePause() {
        pause.addClass('hidden');
        play.removeClass('hidden');
        gif.attr('stopped',true);
        currTrack.pause();
      }

      function changeTrack(trackId) {
        loadTrack(trackId);
      }

      function next() {
        currTrackId = currTrackId < totalTracks ? currTrackId + 1 : 0;

        changeTrack(currTrackId);
      }

      function previous() {
        currTrackId = currTrackId !== 0 ? currTrackId - 1 : totalTracks - 1;

        changeTrack(currTrackId);
      }

      this.play = function() {
        togglePlay();
      };

      this.pause = function() {
        togglePause();
      };

      this.next = next;

      this.previous = previous;

    }

    // Set up dynamic player elements
    var play = $('button.play');
    var pause = $('button.pause');
    var next = $('button.skip');
    var previous = $('button.back');

    // Initialize player variables
    var player;

		SC.initialize({
			client_id: CLIENT_ID
		});

		// tracks/120895837
		SC.get('/playlists/' + PLAYLIST + '?secret_token=' + SECRET_TOKEN, function(set) {

      for (var i in set.tracks) {
        set.tracks[i].bpm = BPMS[i];
      }

      player = new Player(set.tracks);
		});

    play.on('click', function() {
      player.play();
    });

    pause.on('click', function() {
      player.pause();
    });

    if (!SINGLE_ONLY) {
      previous.removeClass('hidden');
      next.removeClass('hidden');

      previous.on('click', function() {
        player.previous();
      });

      next.on('click', function() {
        player.next();
      });
    } else {
      $('.single-only').removeClass('hidden');
    }
	});
})(jQuery, window, document);
