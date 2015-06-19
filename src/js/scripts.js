(function ($, window, document, undefined) {

	'use strict';
	var CLIENT_ID = 'c65d774dc008030d7baf91fa4030b1f6';

	$(function () {
		// FireShell
		SC.initialize({
			client_id: CLIENT_ID
		});

		console.log('loaded');
		// tracks/120895837 
		SC.get('/tracks/120895837', function(track) {
			var dancer = new Dancer();

			window.jcl = {track: track};

			var audio = document.createElement("audio");
			audio.crossOrigin = "anonymous";
			audio.src = track.stream_url + '?client_id=' + CLIENT_ID;
			var ac = new AudioContext();
			// ac.createMediaElementSource(audio).connect(ac.destination);

			console.log(audio);
			dancer.load( audio );

			var kick = dancer.createKick({
				onKick: function ( mag ) {
					console.log('Kick!');
				},
				offKick: function ( mag ) {
					console.log('no kick :(');
				}
			});

			// Let's turn this kick on right away
			kick.on();
			dancer.play();
		});
	});

})(jQuery, window, document);
