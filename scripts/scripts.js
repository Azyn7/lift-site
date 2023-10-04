let width = screen.width;
$('document').ready(function() {
    setTimeout(() => {
        AOS.init();
    }, 120);

    if (width >= 768) {
        $('#team-header').addClass("team-parallax");
    } else {
        $('#team-header').removeClass("team-parallax");
    }
});