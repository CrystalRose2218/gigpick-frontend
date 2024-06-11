import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  render(){
    const template = html`
      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content">
        <h1 class="anim-in">Good to see ya, ${Auth.currentUser.firstName}</h1>

        <h3>Button example:</h3>
        <sl-button variant="primary" class="anim-in" @click=${() => gotoRoute('/profile')}>VIEW PROFILE</sl-button>
        <p>&nbsp;</p>
        <h3>Link example</h3>
        <a href="/profile" @click=${anchorRoute}>View Profile</a> <br>
        <a href="/gigs" @click=${anchorRoute}>Find Gigs</a> <br>
        <sl-button variant="primary" class="square anim-in" @click=${() => gotoRoute('/gigs')}> Find Gigs </sl-button>
        
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()