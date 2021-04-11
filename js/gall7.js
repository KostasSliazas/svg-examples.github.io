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
      this.insi = d.createElement('div')
      this.imag.appendChild(this.head).id = 'head7'
      this.imag.appendChild(this.clos).id = 'clos7'
      this.imag.appendChild(this.cent).id = 'cent7'
      this.onow.appendChild(this.alts).id = 'alts7'
      this.frag.appendChild(this.imag).id = 'imag7'
      this.cent.appendChild(this.rigt).appendChild(this.irig).id = 'irig7'
      this.cent.appendChild(this.insi).appendChild(this.imgs)
      this.cent.appendChild(this.left).appendChild(this.ilef).id = 'ilef7'
      this.imag.appendChild(this.foot).appendChild(this.play).id = 'play7'
      this.imag.appendChild(this.onow).appendChild(this.wdow).appendChild(this.down)
      this.foot.appendChild(this.fine)
      this.foot.id = 'foot7'
      this.rigt.id = 'rigt7'
      this.insi.id = 'insi7'
      this.left.id = 'left7'
      this.onow.id = 'onow7'
      this.down.id = 'down7'
      this.wdow.id = 'wdow7'
      this.imgs.setAttribute('alt', '')
      this.imag.setAttribute('tabindex', '-1')
      this.imag.className = 'hide7'
      this.imgs.src = 'data:,'
      d.body.appendChild(this.frag)
    }

    loaded (e) {
      e.onload = e => { e.target.parentElement.className = '' }
      e.src = e.src // force browser to repaint loaders and images reload
    }

    autoPlay () {
      if (this.isActive) {
        if (this.isAutoplayOn) {
          this.clear()
        } else {
          this.play.className = 'acts7'
          this.isAutoplayOn = true
          const delay = () => {
            this.right()
            this.show()
            this.tim = setTimeout(() => {
              clearTimeout(this.tim)
              this.tim = 0
              if (this.indexOfImage === this.imagesArray.length - 1 && this.isAutoplayOn) {
                this.clear()
              } else {
                delay()
              }
            }, 1500)
          }
          delay()
        }
        this.setActiveClass.call(this.play)
      }
    }

    clear () {
      clearTimeout(this.tim)
      this.tim = 0
      this.isAutoplayOn = false
      this.play.classList.remove('acts7')
    }

    downloads () {
      this.setActiveClass.call(this.down)
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
      if (this.indexOfImage === 0) this.indexOfImage = this.imagesArray.length
      this.indexOfImage--
      this.setActiveClass.call(this.ilef)
    }

    right () {
      if (this.indexOfImage === this.imagesArray.length - 1) this.indexOfImage = -1
      this.indexOfImage++
      this.setActiveClass.call(this.irig)
    }

    close () {
      this.clear()
      this.isActive = false
      this.imag.className = 'hide7'
      d.body.style.overflowY = 'visible'
    }

    setActiveClass () {
      this.className += ' focu7'
      setTimeout(() => {
        this.classList.remove('focu7')
      }, 100)
    }

    show () {
      // if null is set as index return false
      if (this.indexOfImage === null) return false

      // don't rewrite values if active and set active gallery
      if (!this.isActive) {
        this.isActive = true
        this.imag.className = ''
        d.body.style.overflowY = 'hidden'
        this.imag.focus()
      }

      // two lines below for hiding left right buttons
      this.left.className = this.indexOfImage === 0 ? 'hide7' : ''
      this.rigt.className = this.indexOfImage === this.imagesArray.length - 1 ? 'hide7' : ''

      const imageSrc = this.imagesArray[this.indexOfImage].src
      this.insi.className = 'spin7'
      this.alts.innerText = imageSrc.slice(imageSrc.lastIndexOf('/') + 1)
      this.fine.innerText = Number(this.indexOfImage) + 1 + '/' + this.imagesArray.length

      // if svg load svg
      if (imageSrc.substr(imageSrc.length - 3) === 'svg') {
        this.imgs.src = imageSrc
      } else {
        // chech is there a biger resolution image in 'big' folder
        this.imgs.src = imageSrc.substring(0, imageSrc.lastIndexOf('/') + 1) + 'big' + imageSrc.slice(imageSrc.lastIndexOf('/'))
      }

      // set default src if only one image
      this.imgs.onerror = () => { this.imgs.src = imageSrc }
      this.loaded(this.imgs)
    }
  }

  d.addEventListener('DOMContentLoaded', () => {
    const cont = d.getElementsByClassName('images-container')[0] ? d.getElementsByClassName('images-container') : [d.body] // check and set any container default = body
    const images = new CreateUI(cont)

    for (let i = images.container.length - 1; i >= 0; i--) {
      images.imagesContainersArray.push(images.container[i])
    }

    for (let i = images.imagesContainersArray.length - 1; i >= 0; i--) {
      const img = images.imagesContainersArray[i].getElementsByTagName('img')
      for (let j = 0; j < img.length; j++) {
        img[j].parentElement.className = 'spin7'
        images.loaded(img[j])
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
      if (e.target.tagName === 'IMG') {
        e.preventDefault() // prevent for default browser actions
        e.stopPropagation()
        images.indexOfImage = images.imagesArray.indexOf(e.target) === -1 ? null : images.imagesArray.indexOf(e.target) // set image index on click
        images.show()
      }
    }

    images.imag.addEventListener('click', (e) => {
      e.preventDefault() // prevent for default browser actions
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
          if (images.imagesArray[images.indexOfImage].src === images.onow.dataset.selected) return
          images.downloads()
          break
        case 'clos7':
          images.close()
          break
        default:
          return false
      }
      return false
    })

    w.addEventListener('keyup', (e) => {
      if (!images.isActive || e.isComposing || e.key === 229) return false
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
})(window, document)
