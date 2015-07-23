(function ($, window, document, undefined) {

	'use strict';
	var CLIENT_ID = 'c65d774dc008030d7baf91fa4030b1f6';

	$(function () {
    var play = $('button.play');
    var pause = $('button.pause');

		// FireShell
		SC.initialize({
			client_id: CLIENT_ID
		});

		console.log('loaded');
		// tracks/120895837
		SC.get('/tracks/177731606', function(track) {
			window.dancer = new Dancer();

			window.jcl = {track: track};

      console.log(track);

			var audio = document.createElement("audio");
			audio.crossOrigin = "anonymous";
			audio.src = track.stream_url + '?client_id=' + CLIENT_ID;

			console.log(audio);
			window.dancer.load( audio );
		})

    play.on('click', function() {
      play.addClass('hidden');
      pause.removeClass('hidden');
      $('x-gif').removeAttr('stopped');
      dancer.play();
    });

    pause.on('click', function() {
      pause.addClass('hidden');
      play.removeClass('hidden');
      $('x-gif').attr('stopped',true);
      dancer.pause();
    });
	});

})(jQuery, window, document);
