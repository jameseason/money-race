import React, {Component} from 'react';
import Race from './components/Race';
import Controller from './components/Controller';
import Sort from './components/Sort';
import {getData} from './getData';
import * as Constants from './constants';
import Button from 'react-bootstrap/Button';

/** Main application class */
class App extends Component {
  /**
   * @param {Object} props - constructor props
   */
  constructor(props) {
    super(props);

    this.setOnHand = this.setOnHand.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
    this.toggleRating = this.toggleRating.bind(this);
    this.setRaces = this.setRaces.bind(this);

    this.state = {
      onHand: true,
      includeRating: {
        tossup: true,
        lean: true,
        likely: true,
        solid: true,
      },
      sortBy: 'rating',

      races: [],
    };
  }

  /**
   * Set whether cash on hand or total raised is displayed.
   * @param {boolean} onHand - true if cash on hand should be displayed,
   *  false for total raised.
   */
  setOnHand(onHand) {
    this.setState({
      onHand: onHand,
    });
  }

  /**
   * Set how the list is sorted. See Sort.js for supported values.
   * @param {string} newSort - What to sort by
   */
  setSortBy(newSort) {
    this.setState({
      sortBy: newSort,
    });
  }

  /**
   * Toggle whether a rating is shown.
   * @param {string} ratingToToggle - What rating to toggle
   */
  toggleRating(ratingToToggle) {
    this.setState((prevState) => ({
      includeRating: {
        ...prevState.includeRating,
        [ratingToToggle]: !prevState.includeRating[ratingToToggle],
      },
    }));
  }

  /**
   * Determine whether a race rating should be visible.
   * @param {string} rating - What rating to check
   * @return {boolean} - Whether the rating should be visible
   */
  isVisible(rating) {
    switch (rating) {
      case 'tossup': return this.state.includeRating.tossup;
      case 'leanRep': return this.state.includeRating.lean;
      case 'leanDem': return this.state.includeRating.lean;
      case 'likelyRep': return this.state.includeRating.likely;
      case 'likelyDem': return this.state.includeRating.likely;
      case 'solidRep': return this.state.includeRating.solid;
      case 'solidDem': return this.state.includeRating.solid;
      default:
        console.log('invalid rating: ' + rating);
        return false;
    }
  }

  /**
   * Put the race data into the state.
   * @param {Object[]} raceInfo - race information for all candidates
   */
  setRaces(raceInfo) {
    this.setState({
      races: raceInfo,
    });
  }

  /**
   * Convert rating to display string.
   * @param {string} str - rating string
   * @return {string} - display string for rating
   */
  convertRatingString(str) {
    switch (str) {
      case 'tossup': return 'Tossup';
      case 'leanRep': return 'Lean R';
      case 'leanDem': return 'Lean D';
      case 'likelyRep': return 'Likely R';
      case 'likelyDem': return 'Likely D';
      case 'solidRep': return 'Solid R';
      case 'solidDem': return 'Solid D';
      default:
        console.log('invalid rating: ' + str);
        return 'Invalid Rating';
    }
  }

  /** invoked immediately after the component is mounted */
  componentDidMount() {
    getData(this.setRaces);
  }

  /** @return {ReactComponent} - rendered component */
  render() {
    return (

      <div>
        <center>
          <h1 className="display-4">{Constants.title}</h1>
          <p className="topText">{Constants.topText}</p>
        </center>

        <hr className="onlyShowOnMobile" />

        <div className = "sidenav">
          <Controller
            onHandHandler = {this.setOnHand}
            onHand = {this.state.onHand}
            sortByHandler = {this.setSortBy}
            sortBy = {this.state.sortBy}
            toggleRating = {this.toggleRating}
            includeRating = {this.state.includeRating} />
        </div>

        <hr className="onlyShowOnMobile" />

        <div className="raceList">
          <Sort by={this.state.sortBy} onHand={this.state.onHand}>
            {this.state.races.map((race) => (

              <div className={`row ${this.isVisible(race.rating) ? '' : 'hidden'}`}
                key={race.stateAbbrev} race={race} >

                <div className={`state ${race.rating}`}>
                  <span className={'stateface hover stateface-' + race.stateAbbrev}>
                    <span className="hovertext">
                      {this.convertRatingString(race.rating)}
                    </span>
                  </span>
                </div>

                <div className="raceInfo">
                  <Race
                    key={race.demId}
                    race={race}
                    onHand={this.state.onHand} />
                </div>

              </div>

            ))}
          </Sort>
        </div>

        <center>
          <p className="bottomText">{Constants.bottomText}</p>
          <p>
            <Button className="footerButton" variant="outline-secondary"
              href={Constants.githubLink} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github fa-lg"></i>
              <span className="hideOnMobile">Contribute</span>
            </Button>
            <Button className="footerButton" variant="outline-secondary"
              href={Constants.facebookLink} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-lg"></i>
              <span className="hideOnMobile">Share</span>
            </Button>
            <Button className="footerButton" variant="outline-secondary"
              href={Constants.twitterLink} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-lg"></i>
              <span className="hideOnMobile">Tweet</span>
            </Button>
            <Button className="footerButton" variant="outline-secondary"
              href={Constants.redditLink} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-reddit fa-lg"></i>
              <span className="hideOnMobile">Submit</span>
            </Button>
          </p>
        </center>
      </div>
    );
  }
}

export default App;
