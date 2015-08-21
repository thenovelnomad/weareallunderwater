(function ($, window, document, undefined) {

	'use strict';
	const CLIENT_ID = 'c65d774dc008030d7baf91fa4030b1f6';
  const PLAYLIST = '94097386';
  const SECRET_TOKEN = 's-Mq3BZ';
  var BPMS = [
    60,
    120,
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
      var currTrackId = 0;
      var currTrack;
      var currTrackDuration = 0;
      var totalTracks = tracks.length;
      var trackName = $('h3.track-name');
      var gif = $('x-gif');
      loadTrack(currTrackId);

      function loadTrack(trackId) {
        // console.log(currTrack);
        if (currTrack && currTrack._player) {
          currTrack._player.kill();
        }

        var track = tracks[trackId];
        trackName.text(track.title);
        gif.attr('bpm', track.bpm);
        SC.stream('/tracks/' + track.id + '?secret_token=' + SECRET_TOKEN, function(sound){
          console.log(sound);
          window.track = currTrack = sound;


          if (notFirstPlay) {
            currTrack.play({
              onfinish: function() {
                console.log('track ended', self, this);
                self.next();
              },
              onplay: function() {

              }
            });
            gif.removeAttr('stopped');
          }
        });
      }

      function togglePlay() {
        if (!notFirstPlay) {
          notFirstPlay = true;
        }
        gif.removeAttr('stopped');
        currTrack.play({
          onfinish: function() {
            self.next();
          }
        });

      }

      function togglePause() {
        currTrack.pause();
      }

      function changeTrack(trackId) {
        loadTrack(trackId);
      }

      this.play = function() {
        play.addClass('hidden');
        pause.removeClass('hidden');
        // gif.removeAttr('stopped');
        togglePlay();
      };

      this.pause = function() {
        pause.addClass('hidden');
        play.removeClass('hidden');
        gif.attr('stopped',true);
        togglePause();
      };

      this.next = function() {
        currTrackId = currTrackId < totalTracks ? currTrackId + 1 : 0;
        gif.attr('stopped',true);
        changeTrack(currTrackId);
      };

    }

    // function loadTrack(track) {
    //   trackName.text(tracks[track].title);
    //   player = newPlayer();
    //   player.load( tracks[track].audioElement );
    // }

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

			window.jcl = set;

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

    previous.on('click', function() {
      // if (currTrack === 0 || player.getTime < 5) {
      //   loadTrack(currTrack);
      // } else {
      //   loadTrack(currTrack--);
      // }
    });

    next.on('click', function() {
      player.next();
      // player.pause();
      // currTrack++;
      // if (currTrack >= totalTracks ) {
      //   currTrack = 0;
      // }
      // loadTrack(currTrack);
    });
	});
})(jQuery, window, document);
