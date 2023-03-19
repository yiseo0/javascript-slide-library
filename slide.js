const slideshow = (target) => {
   let slideWrapper = document.querySelector(target),
      slides = slideWrapper.querySelector('.slides'),
      slide = slideWrapper.querySelectorAll('.slide'),
      currentIdx = 0,
      slideCount = slide.length,
      slideWidth = 300,
      slideMargin = 30,
      moveAmt = 0,
      maxSlides = 3,
      responsiveMargin = 20,
      newSlide = '',
      newslideWidth = slideWidth,
      prevBtn = slideWrapper.querySelector('.prev'),
      nextBtn = slideWrapper.querySelector('.next')

   makeClone()
   slideResize()
   window.addEventListener('resize', () => {
      slideResize()
   })

   // 기존 슬라이드를 앞/뒤로 복제하는 함수
   function makeClone() {
      for (let i = 0; i < slideCount; i++) {
         let cloneSlide = slide[i].cloneNode(true)
         cloneSlide.classList.add('clone')
         slides.appendChild(cloneSlide)
      }

      for (let i = slideCount - 1; i >= 0; i--) {
         let cloneSlide = slide[i].cloneNode(true)
         cloneSlide.classList.add('clone')
         slides.prepend(cloneSlide)
      }

      newSlide = slideWrapper.querySelectorAll('.slide')

      setInitialPos()
      setInitialHeight()
   }

   function slideResizeWidth(sw, sm) {
      moveAmt = sw + sm
      newSlide.forEach(function (item) {
         item.style.width = sw + 'px'
      })
   }

   // 기존 슬라이드의 위치로 translate 시키는 초기화 함수
   function setInitialPos() {
      let initialTranslateValue = moveAmt * -slideCount
      slides.style.transform = `translateX(${initialTranslateValue}px)`
   }

   // 슬라이드의 높이를 확인하여 부모의 높이로 지정하는 함수
   function setInitialHeight() {
      let topHeight = 0

      for (let i = 0; i < slideCount; i++) {
         if (slide[i].offsetHeight > topHeight) {
            topHeight = slide[i].offsetHeight
         }
      }
      slideWrapper.style.height = topHeight + "px"
   }

   // Nex Btn
   nextBtn.addEventListener('click', () => {
      moveSlide(currentIdx + 1)
   })

   // Prev Btn
   prevBtn.addEventListener('click', () => {
      moveSlide(currentIdx - 1)
   })

   // 슬라이드 이동 함수
   function moveSlide(num) {
      slides.classList.add('animated')
      slides.style.left = -num * moveAmt + 'px'
      currentIdx = num

      if (currentIdx == slideCount || currentIdx == -slideCount) {
         setTimeout(() => {
            slides.classList.remove('animated')
            slides.style.left = '0px'
            currentIdx = 0
         }, 300)
      }
   }

   // 자동 슬라이드 함수
   let timer = undefined
   function autoSlide() {
      if (timer === undefined) {
         timer = setInterval(() => {
            moveSlide(currentIdx + 1)
         }, 1000)
      }
   }
   autoSlide()

   // 자동 슬라이드 정지 함수
   function stopSlide() {
      clearInterval(timer)
      // 시간이 지났을 때 슬라이드가 비정상적인 속도로 움직이는 오류 방지를 위해 timer 값 undefined 처리
      timer = undefined
   }

   slideWrapper.addEventListener('mouseenter', () => {
      stopSlide()
   })

   slideWrapper.addEventListener('mouseleave', () => {
      autoSlide()
   })

   // 반응형 슬라이드 함수
   function slideResize() {
      let currentWidth = document.querySelector('body').offsetWidth
      let slideWrappersWidth = slideWrapper.offsetWidth

      if (currentWidth <= 500) {
         newslideWidth = slideWrappersWidth
         responsiveMargin = 0
      } else if (currentWidth < 700) {
         newslideWidth = (slideWrappersWidth - responsiveMargin * (maxSlides - 1)) / 3
         responsiveMargin = 20
      } else {
         newslideWidth = slideWidth
         responsiveMargin = slideMargin
      }

      slideResizeWidth(newslideWidth, responsiveMargin)
      setInitialPos()
      setInitialHeight()
   }
}

export default slideshow;