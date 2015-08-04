var hp = hp || {};
hp.slideshow = (function () {
    // ... all vars and functions are in this scope only
    // still maintains access to all globals

    var me = this;

    me.init = function () {

        var slider = document.querySelector('.homepage-slideshow-view > div');
        if (slider === null) return; //not the homepage, no slideshow

        var images = slider.querySelectorAll('img');
        var cVisible = 'visible';
        var sDuration = 5000;

        var slide = function (slider, images, activeImage) {
            window.clearTimeout(window.slideTimer);
            var activeImage = activeImage || 0;
            for (var i = 0; i < images.length; i++) {

                if (activeImage >= images.length) {
                    activeImage = 0
                }
                if (i === activeImage) {
                    images[i].classList.add(cVisible);
                    images[i].parentNode.classList.remove('visually-hidden');
                } else {
                    images[i].classList.remove(cVisible);
                }
            }
            activeImage++
            window.slideTimer = window.setTimeout(function () {
                slide(slider, images, activeImage);
            }, sDuration);
        };

        if (slider && images) {
            slide(slider, images);
        }
    }

    return me;
}());

hp.gallery = function (me) {

    me.init = function () {
        var gallery = document.querySelector('.field-name-field-bilderliste');
        if (gallery === null) return;

        me.slideBox = document.createElement('div');
        me.slideBox.id = 'slidebox';
        me.slideBox.addEventListener('click', me.closeImage, false);

        var container = document.createElement('div');
        me.slideBox.appendChild(container);

        document.body.appendChild(me.slideBox);

        var images = gallery.querySelectorAll('a');
        var nrOfOmages = images.length;
        for (var i = 0; i < nrOfOmages; i++) {
            images[i].addEventListener('click', me.openImage, false);
        }
    };

    me.openImage = function (evt) {
        if (me.slideBox === null) return;
        evt.preventDefault();
        me.slideBox.classList.add('open');
        me.slideBox.firstChild.innerHTML = '<img src=' + evt.currentTarget.href.replace('/files-x/', '/files/styles/large/public/') + '>';

    };

    me.closeImage = function (evt) {
        me.slideBox.firstChild.innerHTML = "";
        me.slideBox.classList.remove('open');
    };

    return me;
}(hp);

window.addEventListener('load', hp.slideshow.init);
window.addEventListener('load', hp.gallery.init);

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

