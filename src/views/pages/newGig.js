import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import GigAPI from '../../GigAPI'
import Toast from '../../Toast'

class newGigView {
  init(){
    document.title = 'Add Gig'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newGigSubmitHandler(e) {
    // prevent form from refreshing when submitted
    e.preventDefault()

    // create loading icon
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')

    // Send form data to GigAPI.newGig()
    const formData = new FormData(e.target)
    console.log(formData)
    try {
      await GigAPI.newGig(formData)
      Toast.show("Gig successfully added!")
      
      // reset form
      submitBtn.removeAttribute('loading')
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if (textInputs) textInputs.forEach(textInputs => textInputs.value = null)
      
      // reset select inputs
      const tagInputs = document.querySelectorAll('sl-select')
      if (tagInputs) tagInputs.forEach(tagInput => tagInput.value = null)

      // reset file input
      const fileInput = document.querySelector('input[type=file]')
      if (fileInput) fileInput.value=null 

    } catch(e) {
      Toast.show(e, "error")
      submitBtn.removeAttribute('loading')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Add Gig" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Add New Gig</h1>
        <form class="page-form" @submit=${this.newGigSubmitHandler}>
          
          <input type="hidden" name="venue" value="${Auth.currentUser._id}" />
          <!-- Location will also be a hidden field once I set up venue objects -->
          
          <div class="input-group">
            <sl-input name="title" type="text" label="Name" placeholder="Music Tribute..." required></sl-input>
          </div>
          
          <p style="margin-left: 2em; margin-bottom: -0.5em; text-align:left;"> Date *</p>
          <div class="input-group multi">
            <sl-input name="day" type="number" label="Day" placeholder="12" required> </sl-input> 
            <sl-input name="month" type="number" label="Month" placeholder="6" required> </sl-input> 
            <sl-input name="year" type="number" label="Year" placeholder="2024" required> </sl-input>
          </div>

          <div class="input-group">              
            <sl-input name="time" type="text" label="Time" placeholder="8pm" required>
            </sl-input>
          </div>
          
          <div class="input-group">
            <sl-select multiple clearable name="category" label="Music Genre" placeholder="Pick 1+">
              <sl-option value="rock">Rock</sl-option>
              <sl-option value="jazz">Jazz</sl-option>
              <sl-option value="punk">Punk</sl-option>
              <sl-option value="pop">Pop</sl-option>
              <sl-option value="classical">Classical</sl-option>
              <sl-option value="edm">Electronic</sl-option>
              <sl-option value="indie">Indie/ Alternative</sl-option>
              <sl-option value="country">Country</sl-option>
              <sl-option value="hip_hop">Hip Hop/ RnB</sl-option>
              <sl-option value="metal">Metal</sl-option>
              </sl-select>
          </div>
          
          <div class="input-group">
            <sl-textarea name="description" rows="4" label="Description" placeholder=". . ." required></sl-textarea>
          </div>

          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
        
          <sl-button variant="primary" type="submit" size="large" class="submit-btn" style="width: 80%; margin: 0 auto;">ADD GIG</sl-button>
        
        </form>  
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newGigView()