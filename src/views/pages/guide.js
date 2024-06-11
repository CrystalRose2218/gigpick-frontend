import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser() {
    try { 
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser : false}, 'json')
      console.log("User updated: ", updatedUser)
    }
    catch {
      Toast.show(err, 'error')
    }

  }

  render(){
    const template = html`
      <va-app-header title="Guide" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">        
        
        <h3>Welcome ${Auth.currentUser.firstName}!</h3>
        <p> Thanks for joining the growing community of Gigpick! Here you'll be able to... </p>

        <div class="guide-step">
          <h4>Find Gigs in need of performers!</h4>
          <img src="/images/placeholder.jpeg">
        </div>

        <div class="guide-step">
          <h4> Advertise yourself by customising your profile</h4>
          <img src="/images/placeholder.jpeg">
        </div>

        <div class="guide-step">
          <h4>Add venues to your watchlist!</h4>
          <img src="/images/placeholder.jpeg">
        </div>

        <sl-button variant="primary" @click=${() => gotoRoute('/')}>AWESOME</sl-button>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()