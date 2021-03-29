"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function (w, d) {
  'use strict';

  var CreateUI = /*#__PURE__*/function () {
    function CreateUI(container) {
      _classCallCheck(this, CreateUI);

      this.tim = 0;
      this.imagesContainersArray = []; // get all images containers

      this.imagesArray = []; // get all images

      this.container = container;
      this.indexOfImage = 0;
      this.isActive = false;
      this.isAutoplayOn = false;
      this.frag = d.createDocumentFragment();
      this.imag = d.createElement('div');
      this.cent = d.createElement('div');
      this.left = d.createElement('div');
      this.rigt = d.createElement('div');
      this.clos = d.createElement('div');
      this.foot = d.createElement('div');
      this.alts = d.createElement('div');
      this.play = d.createElement('div');
      this.down = d.createElement('div');
      this.onow = d.createElement('div');
      this.imgs = d.createElement('img');
      this.fine = d.createElement('div');
      this.wdow = d.createElement('div');
      this.ilef = d.createElement('div');
      this.irig = d.createElement('div');
      this.head = d.createElement('div');
      this.insi = d.createElement('div');
      this.imgs.src = 'data:,';
      this.imgs.setAttribute('alt', '');
      this.imag.appendChild(this.head);
      this.imag.appendChild(this.clos);
      this.imag.appendChild(this.cent);
      this.cent.appendChild(this.rigt).appendChild(this.irig);
      this.cent.appendChild(this.insi).appendChild(this.imgs);
      this.cent.appendChild(this.left).appendChild(this.ilef);
      this.imag.appendChild(this.foot).appendChild(this.play);
      this.imag.appendChild(this.onow).appendChild(this.wdow).appendChild(this.down);
      this.onow.appendChild(this.alts);
      this.foot.appendChild(this.fine);
      this.frag.appendChild(this.imag);
      this.head.id = 'head7';
      this.alts.id = 'alts7';
      this.foot.id = 'foot7';
      this.clos.id = 'clos7';
      this.rigt.id = 'rigt7';
      this.left.id = 'left7';
      this.play.id = 'play7';
      this.onow.id = 'onow7';
      this.down.id = 'down7';
      this.cent.id = 'cent7';
      this.imag.id = 'imag7';
      this.wdow.id = 'wdow7';
      this.irig.id = 'irig7';
      this.ilef.id = 'ilef7';
      this.insi.id = 'insi7';
      this.imag.className = 'hide7';
      d.body.appendChild(this.frag);
    }

    _createClass(CreateUI, [{
      key: "autoPlay",
      value: function autoPlay() {
        var that = this;

        if (that.indexOfImage === that.imagesArray.length - 1) {
          that.indexOfImage = -1; // reset from first image to show
        }

        if (this.isAutoplayOn) {
          this.clear();
          this.isActive = true;
        } else {
          this.isAutoplayOn = true;
          this.play.className += ' acts7';

          var delay = function delay() {
            that.right();
            that.show();
            that.tim = setTimeout(function () {
              clearTimeout(that.tim);
              that.tim = 0;

              if (that.indexOfImage < that.imagesArray.length - 1) {
                delay();
              }
            }, 1000);

            if (that.indexOfImage === that.imagesArray.length - 1) {
              that.clear();
            }
          };

          delay();
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        clearTimeout(this.tim);
        this.tim = 0;
        this.play.className = 'play7';
        this.isActive = false;
        this.isAutoplayOn = false;
      }
    }, {
      key: "downloads",
      value: function downloads() {
        var a = d.createElement('a');
        a.setAttribute('rel', 'noopener noreferrer');
        a.target = '_blank';
        a.href = this.imagesArray[this.indexOfImage].src;
        a.download = this.imagesArray[this.indexOfImage].src.split('/').pop();
        a.click();
        a.remove();
        this.onow.dataset.selected = this.imagesArray[this.indexOfImage].src;
      }
    }, {
      key: "lefts",
      value: function lefts() {
        // this line at bottom can be commented for stop at first index of image (now goes around)
        if (this.indexOfImage === 0) this.indexOfImage = this.imagesArray.length;

        if (this.indexOfImage > 0) {
          this.indexOfImage--;
        }
      }
    }, {
      key: "right",
      value: function right() {
        // this line at bottom can be commented for stop at last of image (now goes around)
        if (this.indexOfImage === this.imagesArray.length - 1) this.indexOfImage = -1;

        if (this.indexOfImage < this.imagesArray.length - 1) {
          this.indexOfImage++;
        }
      }
    }, {
      key: "close",
      value: function close() {
        this.clear();
        this.imag.className = 'hide7';
        d.body.style.overflowY = 'visible';
      }
    }, {
      key: "show",
      value: function show() {
        var _this = this;

        if (!this.isActive) {
          this.isActive = true;
          this.imag.className = '';
          d.body.style.overflowY = 'hidden';
          this.imag.focus();
        }

        this.insi.className = 'spin7';
        this.alts.innerText = this.imagesArray[this.indexOfImage].src.slice(this.imagesArray[this.indexOfImage].src.lastIndexOf('/') + 1);
        this.fine.innerText = Number(this.indexOfImage + 1) + '/' + this.imagesArray.length;

        this.imgs.onload = function () {
          _this.insi.classList = '';
        };

        this.imgs.src = this.imagesArray[this.indexOfImage].src;
      }
    }]);

    return CreateUI;
  }();

  d.addEventListener('DOMContentLoaded', function () {
    var cont = d.getElementsByClassName('images-container')[0] ? d.getElementsByClassName('images-container') : [d.body]; // check and set any container default = body

    var images = new CreateUI(cont); // create UI for gallery slides after all DOM Loaded

    for (var i = images.container.length - 1; i >= 0; i--) {
      images.imagesContainersArray.push(images.container[i]);
    }

    for (var _i = images.imagesContainersArray.length - 1; _i >= 0; _i--) {
      var img = images.imagesContainersArray[_i].getElementsByTagName('img');

      for (var j = 0; j < img.length; j++) {
        img[j].parentElement.className = 'spin7';
        img[j].onload = img[j].parentElement.className = '';
        images.imagesArray.push(img[j]);
      }
    }

    if (images.imagesContainersArray[0].tagName === 'BODY') {
      images.imagesArray.pop(); // remove last element from array if body is selected

      d.addEventListener('click', listenForImages);
    } else {
      images.imagesContainersArray.forEach(function (e) {
        return e.addEventListener('click', listenForImages);
      });
    }

    function listenForImages(e) {
      e.preventDefault(); // prevent for default browser actions

      e.stopPropagation();
      if (e.target.tagName !== 'IMG') return false;
      images.indexOfImage = images.imagesArray.indexOf(e.target) ? images.imagesArray.indexOf(e.target) : 0; // set image index on click

      images.show();
    }

    function controls(e) {
      e.preventDefault(); // prevent for default browser actions

      e.stopPropagation();

      switch (e.target.id) {
        case 'rigt7':
          images.clear();
          images.right();
          images.show();
          break;

        case 'left7':
          images.clear();
          images.lefts();
          images.show();
          break;

        case 'play7':
          images.autoPlay();
          break;

        case 'wdow7':
          if (images.imagesArray[images.indexOfImage].src === images.onow.dataset.selected) return;
          images.downloads();
          break;

        case 'clos7':
          images.close();
          break;

        default:
          return false;
      }

      return false;
    }

    images.imag.addEventListener('click', controls);
    w.addEventListener('keyup', function (e) {
      if (!images.isActive || e.isComposing || e.key === 229) return;
      e.preventDefault();

      if (e.key === 'ArrowLeft') {
        images.clear();
        images.lefts();
        images.show();
      }

      if (e.key === 'ArrowRight') {
        images.clear();
        images.right();
        images.show();
      }

      e.key === 'Escape' && images.close();
      e.key === ' ' && images.autoPlay();
    });
  });
})(window, document);
