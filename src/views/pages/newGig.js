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
      Toast.show(e)
      submitBtn.removeAttribute('loading')
    }

    

  }

  render(){
    const template = html`
      <va-app-header title="Add Gig" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Add upcoming Gig</h1>
        <form class="page-form" @submit=${this.newGigSubmitHandler}>
          
          <input type="hidden" name="venue" value="${Auth.currentUser._id}" />
          
          <div class="input-group">
            <sl-input name="title" type="text" placeholder="Name of Gig" required>              
            </sl-input>
          </div>
          
          <div class="input-group">              
            <sl-input name="date" type="text" placeholder="Date" required>
            </sl-input>
          </div>

          <div class="input-group">              
            <sl-input name="time" type="text" placeholder="Time" required>
            </sl-input>
          </div>
          
          <div class="input-group" style="margin-bottom: 2em;">
            <sl-select multiple clearable name="category" placeholder="Category/ Genre">
              <sl-option value="rock">Rock</sl-option>
              <sl-option value="jazz">Jazz</sl-option>
              <sl-option value="punk">Punk</sl-option>
              <sl-option value="pop">Pop</sl-option>
              <sl-option value="classical">Classical</sl-option>
              <sl-option value="edm">Electronic</sl-option>
              <sl-option value="indie">Indie/ Alternative</sl-option>
              <sl-option value="country">Country</sl-option>
              <sl-option value="hip hop">Hip Hop/ RnB</sl-option>
              <sl-option value="metal">Metal</sl-option>
              </sl-select>
          </div>
          
          <div class="input-group">
            <sl-textarea name="description" rows="3" placeholder="Description . . ."></sl-textarea>
          </div>

          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
        
          <sl-button variant="primary" type="submit" class="submit-btn">Add Haircut</sl-button>
        
        </form>  
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newGigView()