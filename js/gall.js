;
(function (w, d) {
  'use strict'
  class CreateUI {
    constructor (containers) {
      this.container = d.getElementsByClassName(containers)
      this.image = null
      this.indexOfImage = 0
      this.isActive = false
      this.frag = d.createDocumentFragment()
      this.imag = d.createElement('div')
      this.cent = d.createElement('div')
      this.left = d.createElement('div')
      this.rigt = d.createElement('div')
      this.iner = d.createElement('div')
      this.clos = d.createElement('div')
      this.head = d.createElement('div')
      this.alts = d.createElement('div')
      this.imgs = d.createElement('img')
      this.imgs.src = 'data:,'
      this.imgs.setAttribute('alt', '')
      this.imag.appendChild(this.head).appendChild(this.clos)
      this.imag.appendChild(this.iner).appendChild(this.cent).appendChild(this.imgs)
      this.head.appendChild(this.alts)
      this.imag.appendChild(this.rigt)
      this.imag.appendChild(this.left)
      this.frag.appendChild(this.imag)
      this.alts.className = 'alts'
      this.head.className = 'head'
      this.iner.className = 'iner'
      this.clos.className = 'clos'
      this.rigt.className = 'rigt'
      this.left.className = 'left'
      this.cent.className = 'cent'
      this.imag.className = 'imag hidden'
      d.body.appendChild(this.frag)

      this.imagesContainersArray = [] // get all images containers
      this.imagesArray = [] // get all images

      for (let i = this.container.length; i--;) {
        this.imagesContainersArray.push(this.container[i])
      }

      for (let i = this.imagesContainersArray.length; i--;) {
        const img = this.imagesContainersArray[i].getElementsByTagName('img')
        for (let j = 0; j < img.length; j++) {
          this.imagesArray.push(img[j])
        }
      }
    }

    lefts () {
      if (this.indexOfImage > 0) {
        this.indexOfImage--
        this.show()
      }
    }

    right () {
      if (this.indexOfImage + 1 < this.imagesArray.length) {
        this.indexOfImage++
        this.show()
      }
    }

    close () {
      this.isActive = false
      d.body.style.overflow = 'visible'
      this.imag.className = 'imag hidden'
    }

    show () {
      if (!this.isActive) {
        this.imag.className = 'imag'
        this.isActive = true
        w.setTimeout(() => {
          d.body.style.overflow = 'hidden'
        }, 150) // delay for body overflow (animation fadeIn/out time + 50ms)
      }
      this.image = this.imagesArray[this.indexOfImage]
      this.left.className = this.indexOfImage === 0 ? 'hidden' : 'left'
      this.rigt.className = this.indexOfImage + 1 === this.imagesArray.length ? 'hidden' : 'rigt'
      this.alts.innerHTML = this.image.getAttribute('alt') + ' image:' + Number(this.indexOfImage + 1) + '/' + this.imagesArray.length
      this.imgs.src = this.image.src
    }
  }

  d.addEventListener('DOMContentLoaded', () => {
    const images = new CreateUI('images-container') // create UI for gallery slides after all DOM Loaded

    d.addEventListener('click', (e) => {
      e.preventDefault() // prevent for default browser actions
      e.stopPropagation()

      switch (e.target.className || e.target.tagName) {
        case 'IMG':
          images.indexOfImage = images.imagesArray.indexOf(e.target) // set image index on click
          images.show()
          break
        case 'rigt':
          images.right()
          break
        case 'left':
          images.lefts()
          break
        case 'clos':
          images.close()
          break
      }
      return false
    })
    // add event on window listen for keys
    w.addEventListener('keyup', (e) => {
      if (!images.isActive || e.isComposing || e.key === 229) return
      e.key === 'ArrowLeft' && images.lefts()
      e.key === 'ArrowRight' && images.right()
      e.key === 'Escape' && images.close()
    })
  })
  // w.imagges = CreateUI
})(window, document)
