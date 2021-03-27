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
      this.head.id = 'head'
      this.alts.id = 'alts'
      this.foot.id = 'foot'
      this.clos.id = 'clos'
      this.rigt.id = 'rigt'
      this.left.id = 'left'
      this.play.id = 'play'
      this.onow.id = 'onow'
      this.down.id = 'down'
      this.cent.id = 'cent'
      this.imag.id = 'imag'
      this.wdow.id = 'wdow'
      this.irig.id = 'irig'
      this.ilef.id = 'ilef'
      this.imag.className = 'visi hide'
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
        this.play.className += ' acts'

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
      this.play.className = 'play'
      this.isActive = false
      this.isAutoplayOn = false
    }

    downloads () {
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
      this.imag.className = 'hide'
      d.body.style.overflowY = 'visible'
    }

    show () {
      if (!this.isActive) {
        this.isActive = true
        this.imag.className = ''
        d.body.style.overflowY = 'hidden'
      }

      this.cent.className = ''
      this.alts.innerText = this.imagesArray[this.indexOfImage].src.slice(this.imagesArray[this.indexOfImage].src.lastIndexOf('/') + 1)
      this.fine.innerText = Number(this.indexOfImage + 1) + '/' + this.imagesArray.length
      this.imgs.onload = addClassStop.call(this.cent, 'stop')
      this.imgs.src = this.imagesArray[this.indexOfImage].src
    }
  }

  function addClassStop (clas) {
    setTimeout(() => { this.className = clas }, 100)
  }

  function loadings () {
    const elem = this.parentElement
    if (elem.tagName === 'LI') {
      addClassStop.call(elem, 'stop')
    }
    return false
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
        img[j].onload = loadings.bind(img[j])
        images.imagesArray.push(img[j])
      }
    }
    w.addEventListener('load', () => {
      images.imagesArray.forEach(function (e) {
        e.onload()
      })
    })

    if (images.imagesContainersArray[0].tagName === 'BODY') {
      images.imagesArray.pop() // remove last element from array if body is selected
      d.addEventListener('click', listenForImages)
    } else {
      images.imagesContainersArray.forEach(e => e.addEventListener('click', listenForImages))
    }

    function listenForImages (e) {
      e.preventDefault() // prevent for default browser actions
      e.stopPropagation()
      images.indexOfImage = images.imagesArray.indexOf(e.target) ? images.imagesArray.indexOf(e.target) : 0 // set image index on click
      images.show()
    }

    function controls (e) {
      e.preventDefault() // prevent for default browser actions
      e.stopPropagation()

      switch (e.target.id || e.target.tagName) {
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
        case 'wdow':
          if (images.imagesArray[images.indexOfImage].src === images.onow.dataset.selected) return
          images.downloads()
          break
        case 'clos':
          images.close()
          break
      }
      return false
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
