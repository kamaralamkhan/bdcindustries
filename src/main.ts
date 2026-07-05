import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor
  const cursorDot = document.querySelector('.cursor-dot') as HTMLElement
  const cursorOutline = document.querySelector('.cursor-outline') as HTMLElement

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX
    const posY = e.clientY

    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`

    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" })
  })

  // Add hover effect to links and buttons
  const interactables = document.querySelectorAll('a, button, .product-visual')
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.width = '60px'
      cursorOutline.style.height = '60px'
      cursorOutline.style.backgroundColor = 'rgba(74, 141, 235, 0.1)'
    })
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.width = '40px'
      cursorOutline.style.height = '40px'
      cursorOutline.style.backgroundColor = 'transparent'
    })
  })

  // Initial Loading Animation
  const tl = gsap.timeline()
  
  tl.fromTo('.nav', 
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
  )
  .fromTo('[data-animate="fade-up"]',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
    "-=0.5"
  )
  .fromTo('.hero-img',
    { scale: 0.8, opacity: 0, rotation: -5 },
    { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' },
    "-=1"
  )
  .fromTo('.glow-effect',
    { opacity: 0, scale: 0 },
    { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
    "-=1.5"
  )

  // Infinite Ticker Animation
  gsap.to('.ticker-content', {
    xPercent: -50,
    ease: "none",
    duration: 20,
    repeat: -1
  })

  // Scrollytelling for Products
  const products = document.querySelectorAll('.product-card')
  products.forEach((product) => {
    const visual = product.querySelector('.product-visual')
    const info = product.querySelector('.product-info')
    
    gsap.fromTo(visual,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: product,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo(info,
      { x: product.classList.contains('reverse') ? -50 : 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: product,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })

  // Facility Parallax
  gsap.to('.parallax-img', {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: '.facility-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })

  // Parts Scale Animation
  gsap.fromTo('.scale-img',
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      scrollTrigger: {
        trigger: '.parts-section',
        start: 'top 70%',
        end: 'bottom center',
        scrub: 1
      }
    }
  )

  // Stats Counter Animation
  const stats = document.querySelectorAll('.stat-number')
  stats.forEach(stat => {
    const text = stat.textContent || ''
    const match = text.match(/(\d+)(.*)/)
    
    if (match) {
      const num = parseInt(match[1])
      const suffix = match[2]
      
      gsap.fromTo(stat, 
        { innerHTML: 0 + suffix },
        {
          innerHTML: num,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
          },
          onUpdate: function() {
            stat.innerHTML = Math.round(this.targets()[0].innerHTML as unknown as number) + suffix
          }
        }
      )
    }
  })
})
