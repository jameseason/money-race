import React, {Component} from 'react';
import Race from './components/Race';

class App extends Component {
  
  state = {
    
    onHand: "true",
    
    races: [
      {
        state: 'Maine',
        stateAbbrev: 'me',

        demId: 'S0ME00111',
        demName: 'Sara Gideon',
        demImg: 'sara-gideon.png',

        repId: 'S6ME00159',
        repName: 'Susan Collins',
        repImg: 'susan-collins.png',
      },
      {
        state: 'North Carolina',
        stateAbbrev: 'nc',

        demId: 'S0NC00202',
        demName: 'Cal Cunningham',
        demImg: 'cal-cunningham.png',

        repId: 'S4NC00162',
        repName: 'Thom Tillis',
        repImg: 'thom-tillis.png',
      },
      {
        state: 'Arizona',
        stateAbbrev: 'az',
        demId: 'S0AZ00350',

        demName: 'Mark Kelly',
        demImg: 'mark-kelly.png',

        repId: 'S8AZ00221',
        repName: 'Martha McSally',
        repImg: 'martha-mcsally.png',
      },
      {
        state: 'Colorado',
        stateAbbrev: 'co',

        demId: 'S0CO00575',
        demName: 'John Hickenlooper',
        demImg: 'john-hickenlooper.png',

        repId: 'S4CO00395',
        repName: 'Cory Gardner',
        repImg: 'cory-gardner.png',
      }
    ]
  };
  
  setOnHand(event) {
    this.setState({
      onHand: (event.target.value === "true")
    });
  }
  
  render() {
    return (
      <div>
      <center><h1>2020 Senate Money Race</h1>
      <p>Money raised by each 2020 Senate candidate, rounded to the nearest dollar. Data is from the most recent FEC filing.</p></center>
      
      <div className="btn-group btn-group-toggle" data-toggle="buttons" onChange={event => this.setOnHand(event)}>
        <label className="btn btn-secondary active">
          Cash on Hand
          <input type="radio" value="true" name="options" id="option1" autoComplete="off" defaultChecked />
        </label>
        <label className="btn btn-secondary">
          Total Raised
          <input type="radio" value="false" name="options" id="option2" autoComplete="off" />
        </label>
      </div>
      
      <div className="raceList">
        {this.state.races.map(race => (
        
        
          <div className="row" key={race.stateAbbrev}>
          
            <div className="state">
              <span className={"stateface stateface-" + race.stateAbbrev}></span>
            </div>
            
            <div className="raceInfo">
              <Race key={race.demId} race={race} onHand={this.state.onHand} />
            </div>
          
          </div>
          
        ))}
      </div>
      </div>
    )
  }
}

export default App;
