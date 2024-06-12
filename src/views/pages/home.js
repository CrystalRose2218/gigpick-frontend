import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'
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
      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="anim-in page-content">
        <h1 class="anim-in">Good to see ya, ${Auth.currentUser.firstName}</h1>
        <div class="container">
        
        <!-- IF MUSICIAN: Show applied gigs section and profile preview -->
        ${Auth.currentUser.accessLevel == 1 ? html`  
          
          <!-- Profile Preview Section --> 
          <div class="user-profile">
            <div class="image">
              ${Auth.currentUser && Auth.currentUser.avatar ? html`
                <sl-avatar image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
              `:html`
              <sl-avatar></sl-avatar>
              `}
            </div>
            <div>
              <h3>${Auth.currentUser.firstName}</h3>
              <h3>${Auth.currentUser.lastName}</h3>
              <p>${Auth.currentUser.bio}</p>
            </div>
            
            <div>
              <sl-button class="square" size="medium" variant="primary" style="border-radius:0; width: 80%" @click=${() => gotoRoute('/profile')}>VIEW PROFILE</sl-button>
            </div>
          </div>
          
          <!-- Applied Gigs Section  -->
          <div class="applied-gigs-section calign home">
            <h2> Your Applied Gigs </h2>
            
            <div class="gigs-grid">
              ${this.appliedGigs == null ? html`
                <strong style="color: #fff"> No gigs have been applied to yet! <strong> <br>
              ` : html`
                
                <!-- WILL replace with "Upcoming Confirmed Gigs" if I can make it ... -->
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
            <div>
              <sl-button variant="primary" size="large" class="square anim-in" style="margin-top: 1em; width: 60%" @click=${() => gotoRoute('/gigs')}> FIND MORE GIGS </sl-button>
            </div>
          
          </div>
        ` : html `

        <!-- IF VENUE OWNER: Your Gigs ADverts Section -->
          <!-- Profile Preview Section --> 
          <div class="user-profile">
            <div class="image">
              ${Auth.currentUser && Auth.currentUser.avatar ? html`
                <sl-avatar image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
              `:html`
              <sl-avatar></sl-avatar>
              `}
            </div>
            <div>
              <h3>${Auth.currentUser.firstName}</h3>
              <h3>${Auth.currentUser.lastName}</h3>
              <p>${Auth.currentUser.bio}</p>
            </div>
            
            <div>
              <sl-button variant="primary" style="border-radius:0;" @click=${() => gotoRoute('/profile')}>VIEW PROFILE</sl-button>
            </div>
          </div>

          <!-- You Gig Listings Section -->
          <div class="generic-entry" style="flex:75%">
            <h2> Your Gig Listings </h2>
          </div>
        `}
        
        <!-- 
        <h3>Button example:</h3>
        <sl-button variant="primary" class="anim-in" @click=${() => gotoRoute('/profile')}>VIEW PROFILE</sl-button>
        <p>&nbsp;</p>
        <h3>Link example</h3>
        <a href="/profile" @click=${anchorRoute}>View Profile</a> <br>
        <a href="/gigs" @click=${anchorRoute}>Find Gigs</a> <br>
        <sl-button variant="primary" class="square anim-in" @click=${() => gotoRoute('/gigs')}> Find Gigs </sl-button> -->
        
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()