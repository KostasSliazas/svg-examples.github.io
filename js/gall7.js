;
(function (w, d) {
  'use strict'
  class CreateUI {
    constructor (container) {
      this.tim = 0
      this.imagesContainersArray = [] // get all images containers
      this.imagesArray = [] // get all images
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
      this.foot = d.createElement('div')
      this.alts = d.createElement('div')
      this.play = d.createElement('div')
      this.down = d.createElement('div')
      this.onow = d.createElement('div')
      this.imgs = d.createElement('img')
      this.fine = d.createElement('div')
      this.wdow = d.createElement('div')
      this.ilef = d.createElement('div')
      this.irig = d.createElement('div')
      this.head = d.createElement('div')
      this.imgs.src = 'data:,'
      this.imgs.setAttribute('alt', '')
      this.imag.appendChild(this.head)
      this.imag.appendChild(this.clos)
      this.imag.appendChild(this.cent).appendChild(this.imgs)
      this.cent.appendChild(this.rigt).appendChild(this.irig)
      this.cent.appendChild(this.left).appendChild(this.ilef)
      this.imag.appendChild(this.foot).appendChild(this.play)
      this.imag.appendChild(this.onow).appendChild(this.wdow).appendChild(this.down)
      this.onow.appendChild(this.alts)
      this.foot.appendChild(this.fine)
      this.frag.appendChild(this.imag)
      this.head.id = 'head7'
      this.alts.id = 'alts7'
      this.foot.id = 'foot7'
      this.clos.id = 'clos7'
      this.rigt.id = 'rigt7'
      this.left.id = 'left7'
      this.play.id = 'play7'
      this.onow.id = 'onow7'
      this.down.id = 'down7'
      this.cent.id = 'cent7'
      this.imag.id = 'imag7'
      this.wdow.id = 'wdow7'
      this.irig.id = 'irig7'
      this.ilef.id = 'ilef7'
      this.imag.className = 'hide7'
      d.body.appendChild(this.frag)
    }

    autoPlay () {
      const that = this
      if (that.indexOfImage === that.imagesArray.length - 1) {
        that.indexOfImage = -1 // reset from first image to show
      }
      if (this.isAutoplayOn) {
        this.clear()
        this.isActive = true
      } else {
        this.isAutoplayOn = true
        this.play.className += ' acts7'

        const delay = () => {
          that.right()
          that.show()
          that.tim = setTimeout(() => {
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

    clear () {
      clearTimeout(this.tim)
      this.tim = 0
      this.play.className = 'play7'
      this.isActive = false
      this.isAutoplayOn = false
    }

    downloads () {
      if (this.imagesArray[this.indexOfImage].src === this.onow.dataset.selected) return false
      const a = d.createElement('a')
      a.setAttribute('rel', 'noopener noreferrer')
      a.target = '_blank'
      a.href = this.imagesArray[this.indexOfImage].src
      a.download = this.imagesArray[this.indexOfImage].src.split('/').pop()
      a.click()
      a.remove()
      this.onow.dataset.selected = this.imagesArray[this.indexOfImage].src
    }

    lefts () {
      // this line at bottom can be commented for stop at first index of image (now goes around)
      if (this.indexOfImage === 0) this.indexOfImage = this.imagesArray.length

      if (this.indexOfImage > 0) {
        this.indexOfImage--
      }
    }

    right () {
      // this line at bottom can be commented for stop at last of image (now goes around)
      if (this.indexOfImage === this.imagesArray.length - 1) this.indexOfImage = -1

      if (this.indexOfImage < this.imagesArray.length - 1) {
        this.indexOfImage++
      }
    }

    close () {
      this.clear()
      this.imag.className = 'hide7'
      d.body.style.overflowY = 'visible'
    }

    show () {
      if (!this.isActive) {
        this.isActive = true
        this.imag.className = ''
        d.body.style.overflowY = 'hidden'
        this.imag.focus()
      }
      this.cent.className = ''

      const that = this
      this.imgs.onload = function () {
        that.cent.className = 'stop7'
        that.alts.innerText = that.imagesArray[that.indexOfImage].src.slice(that.imagesArray[that.indexOfImage].src.lastIndexOf('/') + 1)
        that.fine.innerText = Number(that.indexOfImage + 1) + '/' + that.imagesArray.length
      }
      this.imgs.src = this.imagesArray[this.indexOfImage].src
      return false
    }
  }

  function loadings () {
    const elem = this.parentElement
    elem.tagName === 'LI' && (elem.className = 'stop7')
  }

  d.addEventListener('DOMContentLoaded', () => {
    const cont = d.getElementsByClassName('images-container')[0] ? d.getElementsByClassName('images-container') : [d.body] // check and set any container default = body
    const images = new CreateUI(cont) // create UI for gallery slides after all DOM Loaded

    for (let i = images.container.length - 1; i >= 0; i--) {
      images.imagesContainersArray.push(images.container[i])
    }

    for (let i = images.imagesContainersArray.length - 1; i >= 0; i--) {
      const img = images.imagesContainersArray[i].getElementsByTagName('img')
      for (let j = 0; j < img.length; j++) {
        img[j].onload = loadings.call(img[j])
        images.imagesArray.push(img[j])
      }
    }

    if (images.imagesContainersArray[0].tagName === 'BODY') {
      images.imagesArray.pop() // remove last element from array if body is selected
      d.addEventListener('click', listenForImages)
    } else {
      for (let i = images.imagesContainersArray.length - 1; i >= 0; i--) {
        images.imagesContainersArray[i].addEventListener('click', listenForImages)
      }
    }

    function listenForImages (e) {
      e.preventDefault() // prevent for default browser actions
      e.stopPropagation()
      if (e.target.tagName !== 'IMG') return false
      images.indexOfImage = images.imagesArray.indexOf(e.target) ? images.imagesArray.indexOf(e.target) : 0 // set image index on click
      images.show()
    }

    function controls (e) {
      e.preventDefault()
      e.stopPropagation()
      switch (e.target.id) {
        case 'rigt7':
          images.clear()
          images.right()
          images.show()
          break
        case 'left7':
          images.clear()
          images.lefts()
          images.show()
          break
        case 'play7':
          images.autoPlay()
          break
        case 'wdow7':
          images.downloads()
          break
        case 'clos7':
          images.close()
          break
        default:
          return false
      }
    }

    images.imag.addEventListener('click', controls)
    // add event on window listen for keys
    w.addEventListener('keyup', (e) => {
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
  })
  // w.imagges = CreateUI
})(window, document)
