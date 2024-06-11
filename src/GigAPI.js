import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class GigAPI {

  // POST Create new GIg object ---------------------------------------------------
  async newGig(formData){
    // send fetch request
    const response = await fetch(`${App.apiBase}/gigs`, {
      method: 'POST',
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      body: formData
    })
  
    // if response not ok
    if(!response.ok){ 
      let message = 'Problem creating gig!'
      if(response.status == 400){
        const err = await response.json()
        message = err.message
      }      
      // throw error (exit this function)      
      throw new Error(message)
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
  

  // GET All gigs -----------------------------------------------------------------
  async getGigs(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/gigs`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting gigs')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  // GET single Gig --------------------------------------------------------------
  async getGig(gigId){
    // validate
    if(!gigId) return
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/gigs/${gigId}`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting Gig')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

}


export default new GigAPI()