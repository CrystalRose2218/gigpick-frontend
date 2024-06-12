import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Profile'
    this.appliedGigs = null
    this.render()    
    Utils.pageIntroAnim()
    this.getAppliedGigs()
  }

  async getAppliedGigs(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.appliedGigs = currentUser.appliedGigs
      console.log(this.appliedGigs)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  

  render(){
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">    
        <div class="profile">    
          ${Auth.currentUser && Auth.currentUser.avatar ? html`
            <sl-avatar style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
          `:html`
          <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
          `}
          <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
          <p>${Auth.currentUser.email}</p>
          
          <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>

          ${Auth.currentUser.bio ? html`
            <h3 style="color: #fff"> Bio </h3>
            <p> ${Auth.currentUser.bio} </p>
          ` : html`
          `}
          <sl-button @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-button>
        </div>

        ${Auth.currentUser.accessLevel == 1 ? html`

          <div class="applied-gigs-section">
              <h1> Your Applied Gigs </h1>
              <div class="gigs-grid">
                
                ${this.appliedGigs == null ? html`
                  <sl-spinner></sl-spinner>
                ` : html`
                  
                ${this.appliedGigs.map(gig => html`
                  <gp-gig class="gig-card"
                    id="${gig._id}"
                    title="${gig.title}"
                    description="${gig.description}"
                    venue="${JSON.stringify(gig.venue)}"
                    image="${gig.image}"
                    time="${gig.time}"
                    date="${gig.date}"
                    category="${gig.category}"
                  >        
                  </gp-gig>

                  `)}
                `}
              </div>
          </div>
        `: html`
        `}

      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()