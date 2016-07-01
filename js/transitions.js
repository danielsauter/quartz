var mobile;
if ($(window).width() < 960) {
    mobile = true;
} else {
    mobile = false;
}

$('body').hide();

$('a').click(function(event) {
    if ($(this).attr('target') != '_blank') {
        event.preventDefault();
        newLocation = this.href;
        $('body').fadeOut(250, function() {
            window.location = newLocation;
        });
    }
});

function cssStyle() {
    // Center the opening title
    if (location.pathname == "/") {
        if (!mobile) {
            $('#primary').css({
                'position': 'absolute',
                'top': '50%',
                'transform': 'translate(-50%,-50%)',
                'left': '50%',

            });
        } else {
            $('#primary').css({
                'position': 'absolute',
                'top': '50%',
                'transform': 'translate(-50%,-65%)',
                'left': '50%',
            });
        }
    }
}

$(document).ready(function() {
    $('body').fadeIn(250);
    cssStyle();
    // CSS STYLING
    $(window).resize(function() {
        cssStyle();
    });

    //-----------------Home Page Redirect-----------------
    if (location.pathname == "/") {
        setTimeout(function() {
            $('body').fadeOut(2000, function() {
                window.location.replace("/archives/");
            });
        }, 15000);

    }

    // ----------------IMAGE Effects----------------------
    // Set all images to greyscale
    if (!mobile) {
        $('.entry').find('img').css({
            'transition': '-webkit-filter .2s ease-in-out, filter .2s ease-in-out',
            '-webkit-filter': 'grayscale(100%)',
            'filter': 'grayscale(100%)',
        });
    }

    if (!mobile) {
        // Hover effect
        $('.entry').find('img').hover(function() {
            $(this).css({

                '-webkit-filter': 'grayscale(0%)',
                'filter': 'grayscale(0%)',
            });
        }, function() {
            $(this).css({
                '-webkit-filter': 'grayscale(100%)',
                'filter': 'grayscale(100%)',
            });
        });
    }

    //-----------------VIMEO Effects----------------------
    var iframe = $('iframe');
    $(iframe).each(function(index, value) {
        var source = $(this).attr('src');
        if (source.indexOf("player.vimeo.com") >= 0) {
            $(this).attr('src', $(this).attr('src') + '?loop=1&api=1&player_id=player_' + index);
            $(this).attr('id', 'player_' + index);
        }

        var player = $f(this);
        console.log($(player).get(0).element.id);
        // When the player is ready, add listeners for pause, finish, and playProgress
        player.addEvent('ready', function() {
            var playerID = $(player).get(0).element.id;
            $('#' + playerID).css({
                '-webkit-filter': 'grayscale(100%)',
                'filter': 'grayscale(100%)',
            });
            player.addEvent('pause', onPause);
            player.addEvent('finish', onFinish);
            player.addEvent('playProgress', onPlayProgress);
        });

        // Call the API when a button is pressed
        $('button').bind('click', function() {
            player.api($(this).text().toLowerCase());
        });

        function onPause() {
            // console.log('pause');
            var playerID = $(player).get(0).element.id;
            $('#' + playerID).css({
                '-webkit-filter': 'grayscale(100%)',
                'filter': 'grayscale(100%)',
            });
        }

        function onFinish() {

        }

        function onPlayProgress(data) {
            // console.log('play');
            var playerID = $(player).get(0).element.id;
            $('#' + playerID).css({
                '-webkit-filter': 'grayscale(0%)',
                'filter': 'grayscale(0%)',
            });
        }

    });

    // ----------------VIDEO Effects----------------------
    // Add playbutton on each video
    $(".playButton").insertAfter($("video"));
    // Make it display block only if parent = embed container
    $(".embed-container").children('.playButton').css({ 'display': "block", });
    // Apply filter
    $('video').css({
        '-webkit-filter': 'grayscale(100%)',
        'filter': 'grayscale(100%)',
    });

    // Play/pause actions
    $(".playVideo").click(function() {
        if (this.paused) {
            this.play();
            $(this).parent().children('.playButton').css({
                'display': "none",
            });
            $(this).css({
                '-webkit-filter': 'grayscale(0%)',
                'filter': 'grayscale(0%)',
            });
        } else {
            this.pause();
            $(this).parent().children('.playButton').css({
                'display': "block",
            });
            $(this).css({
                '-webkit-filter': 'grayscale(100%)',
                'filter': 'grayscale(100%)',
            });
        }
    });
});
