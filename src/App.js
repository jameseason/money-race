import React, {Component} from 'react';
import Race from './components/Race';
import Controller from './components/Controller';
import Sort from './components/Sort';

class App extends Component {
  
  state = {
    
    onHand: true,
    includeTossup: true,
    includeLean: true,
    includeLikely: true,
    includeSolid: false,
    sortBy: 'state',
    
    races: require('./data/candidateInfo.js').default.races,
  };

  constructor(props) {
    super(props);

    this.setOnHand = this.setOnHand.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
    this.toggleTossup = this.toggleTossup.bind(this);
    this.toggleLean = this.toggleLean.bind(this);
    this.toggleLikely = this.toggleLikely.bind(this);
    this.toggleSolid = this.toggleSolid.bind(this);
  }
  
  setOnHand(event) {
    this.setState({
      onHand: (event.target.value === "true")
    });
  }
  
  setSortBy(event) {
    this.setState({
      sortBy: event.target.value
    });
  }

  toggleTossup(event) {
    this.setState({
      includeTossup: !this.state.includeTossup
    });
  }
  toggleLean(event) {
    this.setState({
      includeLean: !this.state.includeLean
    });
  }
  toggleLikely(event) {
    this.setState({
      includeLikely: !this.state.includeLikely
    });
  }
  toggleSolid(event) {
    this.setState({
      includeSolid: !this.state.includeSolid
    });
  }
  
  isVisible(rating) {
    if (rating === "tossup") {
      return this.state.includeTossup;
    }
    if (rating === "leanDem" || rating === "leanRep") {
      return this.state.includeLean;
    }
    if (rating === "likelyDem" || rating === "likelyRep") {
      return this.state.includeLikely;
    }
    if (rating === "solidDem" || rating === "solidRep") {
      return this.state.includeSolid;
    }
    return false;
  }
  
  render() {
    return (
      <div>
      <center><h1>2020 Senate Money Race</h1>
      <p>
        Money raised by each 2020 Senate candidate, rounded to the nearest dollar.
        State silhouettes are colored according to Politico's race predictions.
      </p></center>
      
      <div className = "sidenav">
        <Controller 
                  onHandHandler = {this.setOnHand} onHand = {this.state.onHand} 
                  sortByHandler = {this.setSortBy} sortBy = {this.state.sortBy}
                  toggleTossup = {this.toggleTossup} includeTossup = {this.state.includeTossup} 
                  toggleLean = {this.toggleLean} includeLean = {this.state.includeLean}
                  toggleLikely = {this.toggleLikely} includeLikely = {this.state.includeLikely}
                  toggleSolid = {this.toggleSolid} includeSolid = {this.state.includeSolid} />
      </div>
      
      <div className="raceList">
        <Sort by={this.state.sortBy}>
        {this.state.races.map(race => (
        
        
          <div rating={race.rating} state={race.state} className={`row ${this.isVisible(race.rating) ? "" : "hidden"}`} key={race.stateAbbrev}>
          
            <div className={`state ${race.rating}`}>
              <span className={"stateface stateface-" + race.stateAbbrev}></span>
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
        In cases where the primary is not decided, the contender with the most cash on hand is used.
      </p></center>
      </div>
    )
  }
}

export default App;
