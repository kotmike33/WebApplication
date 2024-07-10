document.oncontextmenu = function() { return false; };

$(document).ready(function() {
    var contextMenu = $('.context-menu');
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    $(document).mousedown(function(event) {
        var map = document.getElementById('map');

        if (event.which === 3) {
            if (event.target !== map) {
                return false;
            }

            var posX = event.pageX;
            var posY = event.pageY;

            contextMenu
                .css({
                    left: posX + 'px',
                    top: posY + 'px'
                })
                .show('fast')
                .find('.context-button')
                .css('display', 'inline-block');
        }

        if (event.which !== 3) {
            if ($(event.target).closest('.context-menu').length === 0) {
                contextMenu.css({
                    left: -500 + 'px',
                    top: -500 + 'px'
                });
            }
        }
    });
});
