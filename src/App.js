import React, {Component} from 'react';
import Race from './components/Race';
import Controller from './components/Controller';
import Sort from './components/Sort';
import {getData} from './getData';

class App extends Component {
  
  state = {
    onHand: true,
    includeRating: {
      tossup: true,
      lean: true,
      likely: true,
      solid: true
    },
    sortBy: 'rating',
    
    races: [],
  };

  constructor(props) {
    super(props);

    this.setOnHand = this.setOnHand.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
    this.toggleRating = this.toggleRating.bind(this);
    this.setRaces = this.setRaces.bind(this);
  }
  
  /* Set onHand state property */
  setOnHand(onHand) {
    this.setState({
      onHand: onHand
    });
  }
  
  /* Set sortBy state property */
  setSortBy(newSort) {
    this.setState({
      sortBy: newSort
    });
  }
  
  /* Toggle whether a rating is included. */
  toggleRating(ratingToToggle) {
    this.setState(prevState => ({
      includeRating: {
        ...prevState.includeRating,
        [ratingToToggle]: !prevState.includeRating[ratingToToggle]
      }
    }))
  }
  
  /* Return whether a rating is included */
  isVisible(rating) {
    switch(rating) {
      case "tossup": return this.state.includeRating.tossup;
      case "leanRep": return this.state.includeRating.lean;
      case "leanDem": return this.state.includeRating.lean;
      case "likelyRep": return this.state.includeRating.likely;
      case "likelyDem": return this.state.includeRating.likely;
      case "solidRep": return this.state.includeRating.solid;
      case "solidDem": return this.state.includeRating.solid;
      default:
        console.log("invalid rating: " + rating);
        return false;
    }
  }
  
  /* Set race information */
  setRaces(raceInfo) {
    this.setState({
      races: raceInfo,
    });
  }

  /* Convert rating to display string */
  convertRatingString(str) {
    switch(str) {
      case "tossup": return "Tossup";
      case "leanRep": return "Lean R";
      case "leanDem": return "Lean D";
      case "likelyRep": return "Likely R";
      case "likelyDem": return "Likely D";
      case "solidRep": return "Solid R";
      case "solidDem": return "Solid D";
      default:
        console.log("invalid rating: " + str);
        return "Invalid Rating";
    }
  }
  
  componentDidMount() {
    getData(this.setRaces);
  }

  render() {
    
    return (
      
      <div>
        <center><h1 className="display-4">2020 Senate Money Race</h1>
        <p>Money raised by each 2020 Senate candidate, rounded to the nearest dollar.
        State silhouettes are colored according to Politico's race predictions.</p></center>

      <div className = "sidenav">
        <Controller 
          onHandHandler = {this.setOnHand} onHand = {this.state.onHand} 
          sortByHandler = {this.setSortBy} sortBy = {this.state.sortBy}
          toggleRating = {this.toggleRating} includeRating = {this.state.includeRating} />
      </div>
      
      <div className="raceList">
        <Sort by={this.state.sortBy} onHand={this.state.onHand}>
        {this.state.races.map(race => (
        
          <div className={`row ${this.isVisible(race.rating) ? "" : "hidden"}`} key={race.stateAbbrev} race={race} >
          
            <div className={`state ${race.rating}`}>
              <span className={"stateface hover stateface-" + race.stateAbbrev}><span className="hovertext">{this.convertRatingString(race.rating)}</span></span>
            </div>

            <div className="raceInfo">
              <Race key={race.demId} race={race} onHand={this.state.onHand} />
            </div>
          
          </div>
          
        ))}
        </Sort>
      </div>


      <center><p>
        Data is from the most recent FEC filing.
        In cases where the primary is not decided, either the incumbent or the contender with the most cash on hand is used.
      </p></center>
      </div>
    )
  }
}

export default App;
