import React, {Component} from 'react';
import Race from './components/Race';

class App extends Component {
  
  state = {
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
        demImg: 'sara-gideon.png',

        repId: 'S8AZ00221',
        repName: 'Martha McSally',
        repImg: 'susan-collins.png',
      },
      {
        state: 'Colorado',
        stateAbbrev: 'co',

        demId: 'S0CO00575',
        demName: 'John Hickenlooper',
        demImg: 'sara-gideon.png',

        repId: 'S4CO00395',
        repName: 'Cory Gardner',
        repImg: 'susan-collins.png',
      }
    ]
  };
  
  render() {
    return (
      
      <div className="raceList">
        {this.state.races.map(race => (
        
        
          <div className="row" key={race.stateAbbrev}>
          
            <div className="state">
              <span className={"stateface stateface-" + race.stateAbbrev}></span>
            </div>
            
            <div className="raceInfo">
              <Race key={race.demId} race={race} />
            </div>
          
          </div>
          
        ))}
      </div>
    )
  }
}

export default App;
