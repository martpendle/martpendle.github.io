$(document).ready(function () {

    $('#menu').on('click', 'a', function (e) {
        e.preventDefault();
        $(this).toggleClass('clicked');
    });

});

