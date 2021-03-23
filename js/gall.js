'use strict'

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _defineProperties (target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

(function (w, d) {
  'use strict'

  const CreateUI = /* #__PURE__ */(function () {
    function CreateUI (container) {
      _classCallCheck(this, CreateUI)

      this.container = container
      this.indexOfImage = 0
      this.isActive = false
      this.isAutoplayOn = false
      this.frag = d.createDocumentFragment()
      this.imag = d.createElement('div')
      this.cent = d.createElement('div')
      this.left = d.createElement('div')
      this.rigt = d.createElement('div')
      this.clos = d.createElement('div')
      this.head = d.createElement('div')
      this.foot = d.createElement('div')
      this.alts = d.createElement('span')
      this.play = d.createElement('div')
      this.down = d.createElement('div')
      this.onow = d.createElement('div')
      this.imgs = d.createElement('img')
      this.fine = d.createElement('span')
      this.imgs.src = 'data:,'
      this.imgs.setAttribute('alt', '')
      this.imag.appendChild(this.head)
      this.imag.appendChild(this.clos)
      this.imag.appendChild(this.cent).appendChild(this.imgs)
      this.head.appendChild(this.alts)
      this.cent.appendChild(this.rigt)
      this.cent.appendChild(this.left)
      this.frag.appendChild(this.imag)
      this.imag.appendChild(this.foot).appendChild(this.play)
      this.foot.appendChild(this.onow).appendChild(this.down)
      this.foot.appendChild(this.fine)
      this.alts.id = 'alts'
      this.head.id = 'head'
      this.foot.id = 'foot'
      this.clos.id = 'clos'
      this.rigt.id = 'rigt'
      this.left.id = 'left'
      this.play.id = 'play'
      this.onow.id = 'onow'
      this.down.id = 'down'
      this.cent.id = 'cent'
      this.imag.id = 'imag'
      this.imag.className = 'vis hidden'
      d.body.appendChild(this.frag)
      this.tim = 0
      this.imagesContainersArray = [] // get all images containers

      this.imagesArray = [] // get all images

      for (let i = this.container.length; i--;) {
        this.imagesContainersArray.push(this.container[i])
      }

      for (let _i = this.imagesContainersArray.length; _i--;) {
        const img = this.imagesContainersArray[_i].getElementsByTagName('img')

        for (let j = 0; j < img.length; j++) {
          this.imagesArray.push(img[j])
        }
      }
    }

    _createClass(CreateUI, [{
      key: 'autoPlay',
      value: function autoPlay () {
        const that = this

        if (that.indexOfImage === that.imagesArray.length - 1) {
          that.indexOfImage = -1 // reset from first image to show
        }

        if (this.isAutoplayOn) {
          this.clear()
          this.isActive = true
        } else {
          this.isAutoplayOn = true
          this.play.className += ' acts'

          function delay () {
            that.right()
            that.show()
            that.tim = setTimeout(function () {
              clearTimeout(that.tim)
              that.tim = 0

              if (that.indexOfImage < that.imagesArray.length - 1) {
                delay()
              }
            }, 1000)

            if (that.indexOfImage === that.imagesArray.length - 1) {
              that.clear()
            }
          }

          delay()
        }
      }
    }, {
      key: 'clear',
      value: function clear () {
        clearTimeout(this.tim)
        this.tim = 0
        this.play.className = 'play'
        this.isActive = false
        this.isAutoplayOn = false
      }
    }, {
      key: 'download',
      value: function download () {
        const a = d.createElement('a')
        a.setAttribute('rel', 'noopener noreferrer')
        a.target = '_blank'
        a.href = this.imagesArray[this.indexOfImage].src
        a.download = this.imagesArray[this.indexOfImage].src.split('/').pop()
        a.click()
        a.remove()
        this.onow.dataset.selected = this.imagesArray[this.indexOfImage].src
      }
    }, {
      key: 'lefts',
      value: function lefts () {
        if (this.indexOfImage > 0) {
          this.indexOfImage--
        }
      }
    }, {
      key: 'right',
      value: function right () {
        if (this.indexOfImage < this.imagesArray.length - 1) {
          this.indexOfImage++
        }
      }
    }, {
      key: 'close',
      value: function close () {
        this.clear()
        d.body.style.overflow = 'visible'
        this.imag.className += ' hidden'
      }
    }, {
      key: 'show',
      value: function show () {
        if (!this.isActive) {
          this.isActive = true
          this.imag.className = 'vis'
          w.setTimeout(function () {
            d.body.style.overflow = 'hidden'
          }, 120) // delay for body overflow (animation fadeIn/out time + 50ms)
        }

        this.left.className = this.indexOfImage === 0 ? 'left hidden' : 'left'
        this.rigt.className = this.indexOfImage === this.imagesArray.length - 1 ? 'rigt hidden' : 'rigt'
        this.alts.innerText = this.imagesArray[this.indexOfImage].getAttribute('alt') || ''
        this.fine.innerText = Number(this.indexOfImage + 1) + '/' + this.imagesArray.length
        this.imgs.src = this.imagesArray[this.indexOfImage].src
      }
    }])

    return CreateUI
  }())

  d.addEventListener('DOMContentLoaded', function () {
    const cont = d.getElementsByClassName('images-container')[0] ? d.getElementsByClassName('images-container') : [d.body] // check and set any container default = body

    const images = new CreateUI(cont) // create UI for gallery slides after all DOM Loaded

    d.addEventListener('click', function (e) {
      e.preventDefault() // prevent for default browser actions

      e.stopPropagation()

      switch (e.target.id || e.target.tagName) {
        case 'IMG':
          images.indexOfImage = images.imagesArray.indexOf(e.target) // set image index on click

          images.show()
          break

        case 'rigt':
          images.clear()
          images.right()
          images.show()
          break

        case 'left':
          images.clear()
          images.lefts()
          images.show()
          break

        case 'play':
          images.autoPlay()
          break

        case 'onow':
          if (images.imagesArray[images.indexOfImage].src === images.onow.dataset.selected) return
          images.download()
          break

        case 'clos':
          images.close()
          break
      }

      return false
    }) // add event on window listen for keys

    w.addEventListener('keyup', function (e) {
      if (!images.isActive || e.isComposing || e.key === 229) return
      e.preventDefault()

      if (e.key === 'ArrowLeft') {
        images.clear()
        images.lefts()
        images.show()
      }

      if (e.key === 'ArrowRight') {
        images.clear()
        images.right()
        images.show()
      }

      e.key === 'Escape' && images.close()
      e.key === ' ' && images.autoPlay()
    })
  }) // w.imagges = CreateUI
})(window, document)
