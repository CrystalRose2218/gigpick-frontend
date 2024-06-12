import { LitElement, html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from '../UserAPI'
import Toast from '../Toast'

customElements.define('gp-gig', class Gig extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    // where each property atttribute is outlined
    return {
      id: {
        type: String
      },
      title: {
        type: String
      },
      venue: {
        type: Object 
      },
      time: {
        type: String
      },
      date: {
        type: String
      },
      image: {
        type: String
      },
      description: {
        type: String
      },
      category: {
        type: Array
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  viewVenueHandler() {
    alert("View venue details")

  }

  async applyToGig() {
    console.log("applying to gig...")
    try {
      UserAPI.applyToGig(this.id)
      Toast.show('Successfully applied to Gig!')
    }catch(err){
      Toast.show(err, 'error')
    }

  }

   // FUNCTION: Open a dialog with extra object info after user clicks button
  async applyNowHandler() {
    // create element and assign class
    const dialogEl = document.createElement('sl-dialog')
    dialogEl.className = 'gig-dialog'

    // specify content
    const dialogContent = html`

      <style>
        .wrap {
            display: flex;
            flex-wrap: wrap;
            color: #000;
        }

        .wrap h1, h3 {
            color: #000;
        }

        .image {
            width: 50%;
        }
        .image img {
            width: 100%;
        }
        .content {
            width: 49%;
            padding-left: 2em;
        }
        .time,
        .date {
            margin: 0.4em;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 1.5em;
            color: var(--brand-color-purp);
        }

        .confirmation {
            margin-top: 1em;
            width: 100%;
        }

      </style>
      <div class="wrap">
          <div class="image">
              <img src="${App.apiBase}/images/${this.image}" alt="${this.title}" />
          </div>
          <div class="content">
              <h1>${this.title}</h1>
              <p>${this.description}</p>
              <p class="time">${this.time}</p> 
              <p class="date">${this.date}</p>
              <p class="tags">${this.category}<p>

              <h3> Are you sure you want to apply? </h3>
          </div>
          <div class="confirmation">
              <sl-button variant="primary" style="width: 100%" size="large" @click=${this.applyToGig.bind(this)}>
              <sl-icon slot="prefix" name="music-note"></sl-icon>
              Apply for Gig!
              </sl-button>
          </div>
      </div>

    `
    // render and append to document body
    render(dialogContent, dialogEl)
    await document.body.append(dialogEl)

    // show dialog then delete when closed
    dialogEl.show()
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
    })



  }
  
  render(){    
    return html`
    <style>
        .wrap {
            color: #000;
        }

        .wrap img {
            max-width: 100%;
        }

        .gig-body {
            position: relative;
        }

        .wrap h2 {
          color: #fff;
          font-family: var(--brand-font-button);
          font-size: 1.7em;
          position: absolute;
          top: -150%;
          text-shadow: 3px 3px 5px black;
        }

        .gig-body {
            display: flex;
        }

        .wrap h3 {
            margin-top: 0;
            text-align: right;
            font-family: var(--brand-font-button);
            color: var(--brand-color-indigo);
        }

        .gig-body p {
          font-family: var(--brand-font-tags);
          color: var(--brand-color-purp);
        }

        .venue {
            margin-top: 0;
            flex: 50%;
            font-size: 1.2em;
        }

        sl-button::part(base) {
          border-radius: 0;
          color: var(--brand-color-indigo);
        }

    </style>

    <sl-card class="wrap">
        <img slot="image" src="${App.apiBase}/images/${this.image}" alt="${this.title}">
        <div class="gig-body">
            <p class="venue">${this.venue.firstName} ${this.venue.lastName} </p>
            <h2> ${this.title} </h2>
            <h3> ${this.time} <br> ${this.date} </h3>
        </div>
        <p> ${this.description} </p>
        <sl-button variant="default" style="margin-top: 0.5rem; width: 100%;" class="anim-in square" @click=${() => gotoRoute('/venues')}> VIEW VENUE </sl-button> <br>
        <sl-button variant="primary" size="large" class="square" style="margin-top: 1rem; width: 100%;" @click=${this.applyNowHandler.bind(this)} > APPLY NOW </sl-button>
    </sl-card>
    
    `
  }
  
})
