import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = new FormData(e.target)
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`
      <div class="full-bg">
      </div>
      <div class="overlay">      
        <div class="page-content page-centered content-split">

          <div class="filler">      
            <img class="signinup-logo" src="/images/landingpage-logo.svg">
            <p style="margin-top: 3em; font-size: large; font-weight: 400"> 
              Musicians on Gigpick can advertise themselves with <br> their profile, browse venues and apply for gigs directly!<br> Venue owners and Managers can create gig listings <br> and work with musicians closely. 
            </p>
          </div>
          
          <div class="signup-box">
            <h1> Sign Up </h1>
            <form class="input-validation-required" @submit="${this.signUpSubmitHandler}">
              <div class="input-group">
                <sl-input name="firstName" type="text" placeholder="First Name" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input name="lastName" type="text" placeholder="Last Name" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input name="email" type="email" placeholder="Email" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
              </div>
              <div class="input-group" style="margin-bottom:2em;">
                <sl-select name="accessLevel" placeholder="I am a ...">
                  <sl-option value="1">Musician</sl-option>
                  <sl-option value="2">Music Venue</sl-option>
                </sl-select> 
              </div>

              <sl-button variant="primary" type="submit" class="submit-btn" style="width: 100%;">Sign Up</sl-button>
            </form>
            <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
          </div>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()