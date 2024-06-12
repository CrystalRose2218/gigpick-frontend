import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import GigAPI from '../../GigAPI'

class GigView {
  async init(){
    document.title = 'Available Gigs'
    this.gigs = null    
    this.render()   
    Utils.pageIntroAnim()
    await this.getGigs()
    //this.filterGigs('date', "15-17")
  }

  // FUNCTION: filters the available gigs by genre, location and date
  async filterGigs(field, match){
    // validation check
    if (!field || !match) return
    
    // retrieve all gigs before filtering
    this.gigs = await GigAPI.getGigs()
    
    let filteredGigs
    
    // filter: music genre
    if (field == "category"){
      filteredGigs = this.gigs.filter(gig => gig.category.includes(match))
      this.gigs = filteredGigs
    }

    // filter: location 
    if (field == "location"){
      console.log("filtering location...", match)
      console.log(this.gigs)

      filteredGigs = this.gigs.filter(gig => gig.location == match)
      this.gigs = filteredGigs
    }

    // filter: date
    if (field == "date"){

      // Get todays date
      const d = new Date()
      console.log(d.toString())
      
      // today[0] = day, today[1] = month - 1
      let today = [(d.getDate()),(d.getMonth())]

      //gig.date[0] = day, gig.date[1] = month
      
      // filter by today
      if (match == "today") {
        console.log(match, today)
        filteredGigs = this.gigs.filter(gig => (gig.date.split('/')[0] == today[0]) && (gig.date.split('/')[1] == today[1] + 1))
      }

      // filter by this week
      // NOTE this won't work if todays date is close to the end of the month :( 
      if (match == "week") {
        console.log(match, today)
        filteredGigs = this.gigs.filter(gig => gig.date.split('/')[0] >= today[0] && gig.date.split('/')[0] <= today[0] + 7)
      }

      // filter by month
      if (match == "month") {
        console.log(match, today)
        filteredGigs = this.gigs.filter(gig => gig.date.split('/')[1] == today[1] + 1)
      }
      /* const dateRangeStart = match.split('-')[0]
      const dateRangeEnd = match.split('-')[1]
      console.log(dateRangeStart, dateRangeEnd)
      console.log((this.gigs[0].date).split('/')[0]) */
      this.gigs = filteredGigs
    }

    // re-render page
    this.render()
    console.log(filteredGigs)
  }

  // FUNCTION: clears the filter buttons to unactivate their styling
  clearFilters() {
    // reset buttons
    const filterButtons = document.querySelectorAll('.filterbtn')
    filterButtons.forEach(btn => btn.classList.remove('filterbtn'))

  }

  //FUNCTION: programmatically allocates parameters to call filter() and resets buttons
  handleFilterBtn(e) {
    // reset buttons
    this.clearFilters()

    // Change button styling when activated
    e.target.classList.add("filterbtn")
    
    // extract data and filter
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")
    this.filterGigs(field, match)
  }

  //FUNCTION: clears all filters to reset gig view
  clearAllFilters() {
    this.getGigs()
    this.clearFilters()
  }

  // FUNCTION: retrieves all gigs from database and asigns to 'gigs'
  async getGigs() {
    try {
      // return json objects and stores inside gigs variable
      this.gigs = await GigAPI.getGigs()
      console.log(this.gigs)
      this.render()
    }
    catch(err) {
      Toast.show(err, 'error')
    }
  }

  /* if gigs are empty, create spinner. Else, forEach (map()) gig create element */
  render(){
    const template = html`
      <va-app-header title="Browse Gigs" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        
        <h1>Available Gigs</h1>

        <div class="container">
          <div class="filter-menu wrap calign">
            <h3> Filters </h3>
              <div>
                <h4 style="text-align: left; margin-left: 1em;"> Genre </h4>
                <sl-button class="inactive" pill size="small" data-field="category" data-match="rock" @click=${this.handleFilterBtn.bind(this)}> Rock </sl-button>
                <sl-button class="inactive" pill size="small" data-field="category" data-match="jazz" @click=${this.handleFilterBtn.bind(this)}> Jazz </sl-button>
                <sl-button class="inactive" pill size="small" data-field="category" data-match="punk" @click=${this.handleFilterBtn.bind(this)}> Punk </sl-button>
                <sl-button class="inactive" pill size="small" data-field="category" data-match="edm" @click=${this.handleFilterBtn.bind(this)}> Electronic </sl-button>
                <sl-button class="inactive" pill size="small" data-field="category" data-match="classical" @click=${this.handleFilterBtn.bind(this)}> Classical </sl-button>
                <sl-button class="inactive" pill size="small" data-field="category" data-match="pop" @click=${this.handleFilterBtn.bind(this)}> Pop </sl-button>
                <sl-button class="inactive" pill size="small" data-field="category" data-match="indie" @click=${this.handleFilterBtn.bind(this)}> Indie/ Alt </sl-button>
                <sl-button class="inactive" pill size="small" data-field="category" data-match="country" @click=${this.handleFilterBtn.bind(this)}> Country </sl-button>
                <sl-button class="inactive" pill size="small" data-field="category" data-match="hip hop" @click=${this.handleFilterBtn.bind(this)}> Hip Hop </sl-button>
                <sl-button class="inactive" pill size="small" data-field="category" data-match="metal" @click=${this.handleFilterBtn.bind(this)}> Metal </sl-button>
              </div>
              <div>
                <h4 style="text-align: left; margin-left: 1em;"> Location </h4>
                <sl-button class="inactive" pill size="small" data-field="location" data-match="Northbridge" @click=${this.handleFilterBtn.bind(this)}> Northbridge </sl-button>
                <sl-button class="inactive" pill size="small" data-field="location" data-match="Perth" @click=${this.handleFilterBtn.bind(this)}> Perth </sl-button>
                <sl-button class="inactive" pill size="small" data-field="location" data-match="Scarborough" @click=${this.handleFilterBtn.bind(this)}> Scarborough </sl-button>
                <sl-button class="inactive" pill size="small" data-field="location" data-match="Fremantle" @click=${this.handleFilterBtn.bind(this)}> Fremantle </sl-button>
                <sl-button class="inactive" pill size="small" data-field="location" data-match="Joondalup" @click=${this.handleFilterBtn.bind(this)}> Joondalup </sl-button>
              </div>
              <div>
                <h4 style="text-align: left; margin-left: 1em;"> Date </h4>
                <sl-button class="inactive" pill size="small" data-field="date" data-match="today" @click=${this.handleFilterBtn.bind(this)}> Today </sl-button>
                <sl-button class="inactive" pill size="small" data-field="date" data-match="week" @click=${this.handleFilterBtn.bind(this)}> This Week </sl-button>
                <sl-button class="inactive" pill size="small" data-field="date" data-match="month" @click=${this.handleFilterBtn.bind(this)}> This Month </sl-button>
              </div>
              <div>
                <sl-button class="square" size="medium" style="margin-top:1em;" @click=${this.clearAllFilters.bind(this)}> Clear Filters </sl-button>
              </div>
            </div>
          <div class="gigs-grid">
            
            ${this.gigs == null ? html`
              <sl-spinner></sl-spinner>
            ` : html`
            ${this.gigs.map(gig => html`
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
      </div>      
    `
    render(template, App.rootEl)
  }
}

export default new GigView()