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
        $('body').fadeOut(100, function() {
            window.location = newLocation;
        });
    }
});


$(document).ready(function() {
    $('body').fadeIn(100);
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
