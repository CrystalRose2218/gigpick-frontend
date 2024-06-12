import { LitElement, html, css } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-app-header', class AppHeader extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){ 
    const currentPath = window.location.pathname
    const navLinks = document.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){   
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick(){  
    const appMenu = document.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = document.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
  }

  createRenderRoot(){
    return this
  }

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }
      .app-header {
        background: #000;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: var(--app-header-height);
        color: #fff;
        display: flex;
        z-index: 9;
        box-shadow: 4px 0px 10px rgba(0,0,0,0.2);
        align-items: center;
      }
      
      .app-header-main {
        position: relative;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-right: 5vw;
        padding-top: 1em;
      }

      .app-header-main::slotted(h1){
        color: #fff;
      }

      .app-logo a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
        padding: .6em;
        display: inline-block;        
      }

      .logo {
        height: 90px;
        position: absolute;
        top: 0.9em;
        left: 2em;
      }
      
      .hamburger-btn::part(base) {
        display: none;
        color: #fff;
      }

      .app-top-nav {
        display: flex;
        height: 100%;
        align-items: center;
      }

      .app-top-nav a {
        display: inline-block;
        font-family: var(--brand-font-sub-heading);
        font-size: 1.3em;
        padding: 1em;
        text-decoration: none;
        color: #fff;
      }

      .sl-drawer::part(panel) {
        background-color: #555555; 
      }

      .app-side-menu-items {
        position: absolute;
        top: 8em;
      }

      .app-side-menu-items a {
        display: block;
        padding: .5em;
        font-family: var(--brand-font-sub-heading);
        text-decoration: none;
        font-size: 1.3em;
        color: #333;
      }

      .app-side-menu-logo {
        width: 150px;
        margin-bottom: 1em;
        position: absolute;
        top: 2em;
        left: 1.5em;
      }

      /* Helps to keep title from overlapping logo */
      .empty {
        width: 240px;
        margin-left: 1.5em;
        height:100%;
      }

      .page-title {
        color: var(--app-header-txt-color);
        font-family: rift, monospace;
        margin-right: 0.5em;
        margin-bottom: 0em;
        font-size: var(--app-header-title-font-size);
      }

      /* active nav links */
      .app-top-nav a.active,
      .app-side-menu-items a.active {
        font-weight: bold;
      }

      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        
        .app-top-nav, .page-title, .empty {
          display: none;
        }

        .app-header-main {
          flex-direction: row-reverse;
        }

        .hamburger-btn::part(base) {
          display: block;
        } 
      }

    </style>

    <header class="app-header">
      
      <div class="app-header-main">
        <div class="empty"> </div>
        <a href="/" @click="${anchorRoute}">
          <img class="logo" src="images/Header-logo.svg" alt="logo">
        </a> 
        <div> 
          ${this.title ? html`
            <h1 class="page-title">${this.title}</h1>
          `:``}
          <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 1.5em;"></sl-icon-button>
      </div>

      <slot></slot>
      </div>

      <nav class="app-top-nav">
        <a href="/" @click="${anchorRoute}">Home</a>
        <a href="/gigs" @click="${anchorRoute}">Find Gigs</a>
        ${(this.user.accessLevel == 2) ? html`
          <a href="/addGig" @click="${anchorRoute}">Create Gig Listing</a>
          ` : html`
          
          `}
        <sl-dropdown>
          <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
            <sl-avatar style="--size: 24px;" image=${(this.user && this.user.avatar) ? `${App.apiBase}/images/${this.user.avatar}` : ''}></sl-avatar> ${this.user && this.user.firstName}
          </a>
          <sl-menu>            
            <sl-menu-item @click="${() => gotoRoute('/profile')}">Profile</sl-menu-item>
            <sl-menu-item @click="${() => gotoRoute('/editProfile')}">Edit Profile</sl-menu-item>
            <sl-menu-item @click="${() => Auth.signOut()}">Sign Out</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </nav>
    </header>

    <sl-drawer class="app-side-menu" class="drawer">
      <img class="app-side-menu-logo" src="/images/header-logo-black.svg">
      <nav class="app-side-menu-items">
        <a href="/" @click="${this.menuClick}">Home</a>
        <a href="/gigs" @click="${this.menuClick}">Find Gigs</a>
        ${(this.user.accessLevel == 2) ? html`
          <a href="/addGig" @click="${this.menuClick}">Create Gig Listing</a>
          ` : html`
          `}
        <a href="/profile" @click="${this.menuClick}">Profile</a>
        <a href="#" @click="${() => Auth.signOut()}">Sign Out</a>
        
      </nav>  
    </sl-drawer>
    `
  }
  
})

