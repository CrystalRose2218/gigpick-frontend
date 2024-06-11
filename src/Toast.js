import App from './App'
import {html, render } from 'lit'
import { gsap } from 'gsap'

export default class Toast {

  // Initialises the toast 
  static init(){
    this.showDuration = 3
    // create container element
    this.containerEl = document.createElement('div')
    this.containerEl.id = 'toasts'    
    // append to <body>
    document.body.appendChild(this.containerEl)    
  }

  static show(content, type = ''){        
    if(!content) return
    // create element
    const toastEl = document.createElement('div')
    toastEl.className = 'toast-entry'
    // if content is empty (="") then its an error
    if(type != "") toastEl.classList.add('is-error')
    toastEl.innerText = content
    
    // appened to container
    this.containerEl.appendChild(toastEl)
    
    // animate using gsap
    const tl = gsap.timeline()    
    tl.from(toastEl, { y: 60, opacity: 0, duration: 0.4, ease: "power3.out"})
    tl.to(toastEl, { marginTop: -50, opacity: 0, delay: this.showDuration, duration: 0.4, onComplete: () => {
      toastEl.remove()
    }})
    
  }
}
