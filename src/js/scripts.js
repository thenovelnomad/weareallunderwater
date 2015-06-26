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
			window.dancer = new Dancer();

			window.jcl = {track: track};

			var audio = document.createElement("audio");
			audio.crossOrigin = "anonymous";
			audio.src = track.stream_url + '?client_id=' + CLIENT_ID;

			console.log(audio);
			window.dancer.load( audio );

			var kick2 = dancer.createKick({
				amplitude: 5,
				onKick: function ( mag ) {
					// console.log('Kick 2!', mag);
				},
				offKick: function ( mag ) {
					// console.log('no kick 2 :(', mag);
				}
			});

			// var kick10 = dancer.createKick({
			// 	frequency: 5,
			// 	amplitude: 5,
			// 	onKick: function ( mag ) {
			// 		console.log('Kick 10!', mag);
			// 	},
			// 	offKick: function ( mag ) {
			// 		// console.log('no kick 10 :(', mag);
			// 	}
			// });

			// Let's turn this kick on right away
			// kick2.on();
			// kick10.on();
			// window.dancer.play();
		});
	});

})(jQuery, window, document);
