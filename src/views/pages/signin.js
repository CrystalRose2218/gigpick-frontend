import App from './../../App'
import {html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

  render(){    
    const template = html`      
      <div class="full-bg">
      </div>
        <div class="overlay">
          <div class="page-content content-split">
            
            <div class="filler">
              <img class="signinup-logo" src="/images/landingpage-logo.svg">
              <p style="margin-top: 3em; font-size: larger; font-weight: 500">
                A backstage platform for venues and musicians <br>to collaborate shows and organise gigs.
              </p>
            </div> 
          
            <div class="signinup-box">
              <h1> Log In </h1>
              <form class="input-validation-required" @submit="${this.signInSubmitHandler}">          
                <div class="input-group">
                  <sl-input name="email" type="email" label="Email" placeholder="John.Music@email.com" required></sl-input>
                </div>
                <div class="input-group">
                  <sl-input name="password" type="password" label="Password" placeholder="********" required toggle-password style="margin-bottom: 2em;"></sl-input>
                </div>
                <sl-button type="submit" variant="primary" class="submit-btn" style="width: 100%;">Sign In</sl-button>
              </form>
              <p style="color: #000">No Account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
            </div>

          </div>
        </div>
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()