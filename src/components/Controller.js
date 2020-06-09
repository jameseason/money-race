import React from 'react';

// TODO: Make the controller prettier
class Controller extends React.Component {
  
  render() {
    
    return(
      <div>
        {/* Cash on hand vs total raised toggle */}
        <div className="btn-group btn-group-toggle" data-toggle="buttons" onChange={event => this.props.onHandHandler(event)}>
          <label className={`btn btn-secondary ${this.props.onHand ? "active" : ""}`}>
            <input type="radio" value="true" name="onHandButton" id="cashOnHand" autoComplete="off" defaultChecked />
            Cash on Hand
          </label>
          <label className={`btn btn-secondary ${this.props.onHand ? "" : "active"}`}>
            <input type="radio" value="false" name="onHandButton" id="cashTotal" autoComplete="off" />
            Total Raised
          </label>
        </div>
        
        {/* Filter by race rating */}
        <div>
          <p>Race ratings to include: <br />
          <button type="button" className={`btn btn-${this.props.includeTossup ? "secondary active" : "outline-secondary"}`} 
                  onClick={event => this.props.toggleTossup(event)}>Tossup</button>
          <button type="button" className={`btn btn-${this.props.includeLean ? "secondary active" : "outline-secondary"}`} 
                  onClick={event => this.props.toggleLean(event)}>Lean</button>
          <button type="button" className={`btn btn-${this.props.includeLikely ? "secondary active" : "outline-secondary"}`} 
                  onClick={event => this.props.toggleLikely(event)}>Likely</button>
          <button type="button" className={`btn btn-${this.props.includeSolid ? "secondary active" : "outline-secondary"}`} 
                  onClick={event => this.props.toggleSolid(event)}>Solid</button>
          </p>
        </div>
        
        {/* Sort by */}
          Sort by: <br />
        <div className="btn-group btn-group-toggle" data-toggle="buttons" onChange={event => this.props.sortByHandler(event)}>
          <label className={`btn btn-secondary ${this.props.sortBy === "state" ? "active" : ""}`}>
            <input type="radio" value="state" name="sortByButton" id="stateNameSort" autoComplete="off" defaultChecked />
            State name
          </label>
          <label className={`btn btn-secondary ${this.props.sortBy === "rating" ? "active" : ""}`}>
            <input type="radio" value="rating" name="sortByButton" id="raceRatingSort" autoComplete="off" />
            Race rating
          </label>
        </div>
      </div>
    )
  }
  
}

export default Controller;