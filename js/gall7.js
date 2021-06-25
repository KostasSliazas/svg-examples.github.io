(function (w, d) {
  'use strict'
  const CreateUI = Object.create(null)
  // create all elements containers array
  CreateUI.createUIContainersArray = []
  // create all elements array
  CreateUI.createUIArray = []
  // initialize container with null value
  CreateUI.container = null
  CreateUI.indexOfImage = 0
  CreateUI.isActive = false
  CreateUI.isAutoplayOn = false
  CreateUI.timeOutVar = 0
  // all stuff for creating main gallery window
  CreateUI.frag = d.createDocumentFragment()
  CreateUI.clos = d.createElement('button')
  CreateUI.ilef = d.createElement('button')
  CreateUI.irig = d.createElement('button')
  CreateUI.wdow = d.createElement('button')
  CreateUI.imag = d.createElement('div')
  CreateUI.cent = d.createElement('div')
  CreateUI.left = d.createElement('div')
  CreateUI.rigt = d.createElement('div')
  CreateUI.foot = d.createElement('div')
  CreateUI.alts = d.createElement('div')
  CreateUI.play = d.createElement('div')
  CreateUI.onow = d.createElement('div')
  CreateUI.fine = d.createElement('div')
  CreateUI.head = d.createElement('div')
  CreateUI.insi = d.createElement('div')
  CreateUI.imgs = d.createElement('img')
  CreateUI.down = d.createElement('span')
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
  // create empty image source
  CreateUI.imgs.src = 'data:,'
  // append document fragment to BODY
  d.body.appendChild(CreateUI.frag)

  // autoplay method
  CreateUI.autoPlay = function () {
    if (this.isAutoplayOn) {
      this.clear()
    } else {
      this.play.className = 'acts7'
      this.isAutoplayOn = true
      this.setActiveClass.call(this.play)
      this.loaded.call(this.imgs)
    }
  }

  // autoplay method loop
  CreateUI.autoPlayLoop = function () {
    this.timeOutVar = setTimeout(function () {
      this.right().show()
      if (this.indexOfImage === this.createUIArray.length - 1) this.clear()
    }.bind(this), 1300)
  }

  // image is loaded method
  CreateUI.loaded = function () {
    this.onload = loadComplete.bind(this)
    const img = this
    this.src = img.src
  }
  // call method on image element
  CreateUI.loaded.call(CreateUI.imgs)

  // clear method to reset all values
  CreateUI.clear = function () {
    clearTimeout(this.timeOutVar)
    this.timeOutVar = 0
    this.isAutoplayOn = false
    this.isLoadedImage = false
    this.play.classList.remove('acts7')
    return this
  }

  // downloads method
  CreateUI.downloads = function () {
    // add class active for button animation
    this.setActiveClass.call(this.down)
    const a = d.createElement('a')
    a.setAttribute('rel', 'noopener noreferrer')
    a.target = '_blank'
    a.href = this.imgs.src
    a.setAttribute('download', this.imgs.src)
    a.click()
    a.remove()
    this.onow.dataset.selected = this.imgs.src
  }

  // to left button method loop from images index
  CreateUI.lefts = function () {
    if (this.indexOfImage > 0) this.indexOfImage--
    else this.indexOfImage = this.createUIArray.length - 1
    this.setActiveClass.call(this.ilef)
    return this
  }

  // to right button method loop from images index
  CreateUI.right = function () {
    if (this.indexOfImage < this.createUIArray.length - 1) this.indexOfImage++
    else this.indexOfImage = 0
    this.setActiveClass.call(this.irig)
    return this
  }

  // function on close
  CreateUI.close = function () {
    this.clear()
    this.isActive = false
    this.imag.className = 'hide7'
    d.body.style.overflowY = 'visible'
  }

  // add class for button animation (when clicked)
  CreateUI.setActiveClass = function () {
    this.classList.add('focu7')
    setTimeout(function () {
      this.classList.remove('focu7')
    }.bind(this), 150)
  }

  // show image method to show image when loaded
  CreateUI.show = function () {
    // if null is set as index return false
    if (this.indexOfImage === null) return false
    this.insi.className = 'spin7'
    const image = this.createUIArray[this.indexOfImage]
    // don't rewrite values if active and set active gallery
    if (!this.isActive) {
      this.isActive = true
      d.body.style.overflowY = 'hidden'
      this.imag.className = ''
      this.imag.focus()
    }
    // two lines below for hiding left right buttons
    this.left.className = this.indexOfImage === 0 ? 'hide7' : ''
    this.rigt.className = this.indexOfImage === this.createUIArray.length - 1 ? 'hide7' : ''
    this.alts.innerText = decodeURI(image.src.slice(image.src.lastIndexOf('/') + 1))
    this.fine.innerText = Number(this.indexOfImage) + 1 + '/' + this.createUIArray.length
    this.imgs.onerror = function (e) { e.target.src = image.src }
    this.imgs.src = image.src.substr(image.src.length - 3) === 'svg' ? image.src : image.src.substring(0, image.src.lastIndexOf('/') + 1) + 'big' + image.src.slice(image.src.lastIndexOf('/'))
  }

  // asign container elements or BODY (default = BODY)
  CreateUI.container = d.getElementsByClassName('images-container')[0]
    ? d.getElementsByClassName('images-container')
    : d.getElementsByTagName('body')
  for (let l = CreateUI.container.length - 1; l >= 0; l--) {
    CreateUI.createUIContainersArray.push(CreateUI.container[l])
  }

  // Loop from elements
  for (let i = CreateUI.createUIContainersArray.length - 1; i >= 0; i--) {
    const img = CreateUI.createUIContainersArray[i].getElementsByTagName('img')
    for (let j = 0; j < img.length; j++) {
      img[j].parentElement.classList.add('spin7')
      CreateUI.loaded.call(img[j])
      CreateUI.createUIArray.push(img[j])
    }
  }

  // listen for clicked on image element and load show method
  const listenForCreateUI = function listenForCreateUI (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault()
      e.stopImmediatePropagation()
      CreateUI.indexOfImage = CreateUI.createUIArray.indexOf(e.target) === -1 ? null : CreateUI.createUIArray.indexOf(e.target) // set image index on click
      CreateUI.show()
    }
  }

  if (CreateUI.createUIContainersArray[0] && CreateUI.createUIContainersArray[0].tagName === 'BODY') {
    // remove last element from array if body is selected
    CreateUI.createUIArray.pop()
    d.body.addEventListener('click', listenForCreateUI)
  } else {
    for (let k = CreateUI.createUIContainersArray.length - 1; k >= 0; k--) { CreateUI.createUIContainersArray[k].addEventListener('click', listenForCreateUI) }
  }

  // autoplay and image loaded helper to remove class 'loader'
  function loadComplete () {
    this.parentElement.classList.remove('spin7')
    CreateUI.isAutoplayOn && CreateUI.autoPlayLoop()
  }

  // add click addEventListener to image div (gallery window)
  CreateUI.imag.addEventListener('click', function (e) {
    if (!CreateUI.isActive) return false
    if (e.target.id === 'wdow7') {
      if (CreateUI.createUIArray[CreateUI.indexOfImage].src === CreateUI.onow.dataset.selected) return false
      CreateUI.clear().downloads()
    }
    e.target.id === 'rigt7' && CreateUI.clear().right().show()
    e.target.id === 'left7' && CreateUI.clear().lefts().show()
    e.target.id === 'play7' && CreateUI.autoPlay()
    e.target.id === 'clos7' && CreateUI.close()
    e.preventDefault()
    e.stopImmediatePropagation()
  })

  // add keyup addEventListener to image div (gallery window)
  w.addEventListener('keyup', function (e) {
    if (!CreateUI.isActive || e.isComposing || e.key === 229) return false
    e.key === 'ArrowLeft' && CreateUI.clear().lefts().show()
    e.key === 'ArrowRight' && CreateUI.clear().right().show()
    e.key === 'Escape' && CreateUI.close()
    e.key === ' ' && CreateUI.autoPlay()
    e.preventDefault()
    e.stopImmediatePropagation()
  })
  // everything to handle swipe left/right
  // https://code-maven.com/swipe-left-right-vanilla-javascript
  const minHorizontalMove = 30
  const maxVerticalMove = 30
  const withinMs = 1000

  let startXPos
  let startYPos
  let startTime
  function touchStart (event) {
    startXPos = event.touches[0].pageX
    startYPos = event.touches[0].pageY
    startTime = new Date()
  }

  function touchEnd (event) {
    const endXPos = event.changedTouches[0].pageX
    const endYPos = event.changedTouches[0].pageY
    const endTime = new Date()
    const moveX = endXPos - startXPos
    const moveY = endYPos - startYPos
    const elapsedTime = endTime - startTime
    if (Math.abs(moveX) > minHorizontalMove && Math.abs(moveY) < maxVerticalMove && elapsedTime < withinMs) {
      if (moveX < 0) {
        CreateUI.clear().right().show()
      } else {
        CreateUI.clear().lefts().show()
      }
    }
  }
  CreateUI.imag.addEventListener('touchstart', touchStart)
  CreateUI.imag.addEventListener('touchend', touchEnd)
  // everything to handle swipe left/right ends
})(window, document)
