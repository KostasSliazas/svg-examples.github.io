;
(function (w, d) {
  'use strict'
  d.addEventListener('DOMContentLoaded', function () {
    const CreateUI = Object.create(null)

    CreateUI.tim = 0
    CreateUI.CreateUIContainersArray = [] // get all CreateUI containers
    CreateUI.CreateUIArray = [] // get all CreateUI
    CreateUI.container = null
    CreateUI.indexOfImage = 0
    CreateUI.isActive = false
    CreateUI.isAutoplayOn = false
    CreateUI.frag = d.createDocumentFragment()
    CreateUI.imag = d.createElement('div')
    CreateUI.cent = d.createElement('div')
    CreateUI.left = d.createElement('div')
    CreateUI.rigt = d.createElement('div')
    CreateUI.clos = d.createElement('button')
    CreateUI.foot = d.createElement('div')
    CreateUI.alts = d.createElement('div')
    CreateUI.play = d.createElement('div')
    CreateUI.down = d.createElement('span')
    CreateUI.onow = d.createElement('div')
    CreateUI.imgs = new w.Image()
    CreateUI.fine = d.createElement('div')
    CreateUI.wdow = d.createElement('button')
    CreateUI.ilef = d.createElement('button')
    CreateUI.irig = d.createElement('button')
    CreateUI.head = d.createElement('div')
    CreateUI.insi = d.createElement('div')
    CreateUI.imag.appendChild(CreateUI.head).id = 'head7'
    CreateUI.imag.appendChild(CreateUI.clos).id = 'clos7'
    CreateUI.imag.appendChild(CreateUI.cent).id = 'cent7'
    CreateUI.onow.appendChild(CreateUI.alts).id = 'alts7'
    CreateUI.frag.appendChild(CreateUI.imag).id = 'imag7'
    CreateUI.cent.appendChild(CreateUI.rigt).appendChild(CreateUI.irig).id = 'irig7'
    CreateUI.cent.appendChild(CreateUI.insi).appendChild(CreateUI.imgs)
    CreateUI.cent.appendChild(CreateUI.left).appendChild(CreateUI.ilef).id = 'ilef7'
    CreateUI.imag.appendChild(CreateUI.foot).appendChild(CreateUI.play).id = 'play7'
    CreateUI.imag.appendChild(CreateUI.onow).appendChild(CreateUI.wdow).appendChild(CreateUI.down)
    CreateUI.foot.appendChild(CreateUI.fine)
    CreateUI.foot.id = 'foot7'
    CreateUI.rigt.id = 'rigt7'
    CreateUI.insi.id = 'insi7'
    CreateUI.left.id = 'left7'
    CreateUI.onow.id = 'onow7'
    CreateUI.down.id = 'down7'
    CreateUI.wdow.id = 'wdow7'
    CreateUI.clos.setAttribute('title', 'Press Esc to close')
    CreateUI.imgs.setAttribute('alt', '')
    CreateUI.imag.setAttribute('tabindex', '-1')
    CreateUI.imag.className = 'hide7'
    CreateUI.imgs.src = 'data:,'
    d.body.appendChild(CreateUI.frag)

    CreateUI.autoplayLoop = function () {
      clearTimeout(this.tim)
      this.tim = 0
      if (this.indexOfImage === this.CreateUIArray.length - 1) {
        this.indexOfImage = -1
        this.clear()
      } else {
        const that = this
        that.tim = setTimeout(function () {
          that.right()
          that.show()
        }, 1200)
      }
    }

    CreateUI.loaded = function (e) {
      const that = this
      e.onload = function (e) {
        e.target.parentElement.className = ''
        if (that.isAutoplayOn) {
          that.autoplayLoop()
        }
      }
      const img = e
      e.src = img.src
    }

    CreateUI.autoPlay = function () {
      if (this.isActive) {
        if (this.indexOfImage === this.CreateUIArray.length - 1) {
          this.indexOfImage = -1
        }
        this.play.className = 'acts7'
        this.isAutoplayOn = true
        this.setActiveClass.call(this.play)
        this.loaded(this.imgs)
      }
    }

    CreateUI.clear = function () {
      clearTimeout(this.tim)
      this.tim = 0
      this.isAutoplayOn = false
      this.isLoadedImage = false
      this.play.classList.remove('acts7')
    }

    CreateUI.downloads = function () {
      this.setActiveClass.call(this.down)
      const a = d.createElement('a')
      a.setAttribute('rel', 'noopener noreferrer')
      a.target = '_blank'
      a.href = this.CreateUIArray[this.indexOfImage].src
      a.download = this.CreateUIArray[this.indexOfImage].src.split('/').pop()
      a.click()
      a.remove()
      this.onow.dataset.selected = this.CreateUIArray[this.indexOfImage].src
    }

    CreateUI.lefts = function () {
      if (this.indexOfImage === 0) this.indexOfImage = this.CreateUIArray.length
      this.indexOfImage--
      this.setActiveClass.call(this.ilef)
    }

    CreateUI.right = function () {
      if (this.indexOfImage === this.CreateUIArray.length - 1) this.indexOfImage = -1
      this.indexOfImage++
      this.setActiveClass.call(this.irig)
    }

    CreateUI.close = function () {
      this.clear()
      this.isActive = false
      this.imag.className = 'hide7'
      d.body.style.overflowY = 'visible'
    }

    CreateUI.setActiveClass = function () {
      const that = this
      this.className += ' focu7'
      setTimeout(function () {
        that.classList.remove('focu7')
      }, 100)
    }

    CreateUI.show = function () {
    // if null is set as index return false
      if (this.indexOfImage === null) return false

      // don't rewrite values if active and set active gallery
      if (!this.isActive) {
        this.isActive = true
        this.imag.className = ''
        d.body.style.overflowY = 'hidden'
        this.imag.focus()
      }
      const image = this.CreateUIArray[this.indexOfImage]

      // two lines below for hiding left right buttons
      this.left.className = this.indexOfImage === 0 ? 'hide7' : ''
      this.rigt.className = this.indexOfImage === this.CreateUIArray.length - 1 ? 'hide7' : ''

      this.insi.className = 'spin7'
      this.alts.innerText = image.src.slice(image.src.lastIndexOf('/') + 1)
      this.fine.innerText = Number(this.indexOfImage) + 1 + '/' + this.CreateUIArray.length

      let imageSrc
      // if svg load svg
      if (image.src.substr(image.src.length - 3) === 'svg') {
        imageSrc = image.src
      } else {
      // chech is there a biger resolution image in 'big' folder
        imageSrc = image.src.substring(0, image.src.lastIndexOf('/') + 1) + 'big' + image.src.slice(image.src.lastIndexOf('/'))
      }
      this.imgs.onerror = function (e) {
        e.target.src = image.src
      }
      this.imgs.src = imageSrc
    }
    CreateUI.container = d.getElementsByClassName('CreateUI-container')[0] ? d.getElementsByClassName('CreateUI-container') : [d.body] // check and set any container default = body
    for (let i = CreateUI.container.length - 1; i >= 0; i--) {
      CreateUI.CreateUIContainersArray.push(CreateUI.container[i])
    }

    for (let i = CreateUI.CreateUIContainersArray.length - 1; i >= 0; i--) {
      const img = CreateUI.CreateUIContainersArray[i].getElementsByTagName('img')
      for (let j = 0; j < img.length; j++) {
        img[j].parentElement.className = 'spin7'
        CreateUI.loaded(img[j])
        CreateUI.CreateUIArray.push(img[j])
      }
    }

    if (CreateUI.CreateUIContainersArray[0].tagName === 'BODY') {
      CreateUI.CreateUIArray.pop() // remove last element from array if body is selected
      d.addEventListener('click', listenForCreateUI)
    } else {
      for (let i = CreateUI.CreateUIContainersArray.length - 1; i >= 0; i--) {
        CreateUI.CreateUIContainersArray[i].addEventListener('click', listenForCreateUI)
      }
    }

    function listenForCreateUI (e) {
      if (e.target.tagName === 'IMG') {
        e.preventDefault() // prevent for default browser actions
        e.stopPropagation()
        CreateUI.indexOfImage = CreateUI.CreateUIArray.indexOf(e.target) === -1 ? null : CreateUI.CreateUIArray.indexOf(e.target) // set image index on click
        CreateUI.show()
      }
    }

    CreateUI.imag.addEventListener('click', function (e) {
      e.preventDefault() // prevent for default browser actions
      switch (e.target.id) {
        case 'rigt7':
          CreateUI.clear()
          CreateUI.right()
          CreateUI.show()
          break
        case 'left7':
          CreateUI.clear()
          CreateUI.lefts()
          CreateUI.show()
          break
        case 'play7':
          CreateUI.autoPlay()
          break
        case 'wdow7':
          if (CreateUI.CreateUIArray[CreateUI.indexOfImage].src === CreateUI.onow.dataset.selected) return
          CreateUI.downloads()
          break
        case 'clos7':
          CreateUI.close()
          break
        default:
          return false
      }
      return false
    })

    w.addEventListener('keyup', function (e) {
      if (!CreateUI.isActive || e.isComposing || e.key === 229) return false
      if (e.key === 'ArrowLeft') {
        CreateUI.clear()
        CreateUI.lefts()
        CreateUI.show()
      }
      if (e.key === 'ArrowRight') {
        CreateUI.clear()
        CreateUI.right()
        CreateUI.show()
      }
      if (e.key === 'Escape') CreateUI.close()
      e.key === ' ' && CreateUI.autoPlay()
      e.preventDefault()
      e.stopImmediatePropagation()
    }, true)
  })
})(window, document)
