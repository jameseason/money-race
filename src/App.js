import React, {Component} from 'react';
import Race from './components/Race';

class App extends Component {
  
  state = {
    races: [
      {
        state: 'Maine',
        demId: 'S0ME00111',
        demName: 'Sara Gideon',
        repId: 'S6ME00159',
        repName: 'Susan Collins',
      },
      {
        state: 'North Carolina',
        demId: 'S0NC00202',
        demName: 'Cal Cunningham',
        repId: 'S4NC00162',
        repName: 'Thom Tillis',
      },
      {
        state: 'Arizona',
        demId: 'S0AZ00350',
        demName: 'Mark Kelly',
        repId: 'S8AZ00221',
        repName: 'Martha McSally',
      },
      {
        state: 'Colorado',
        demId: 'S0CO00575',
        demName: 'John Hickenlooper',
        repId: 'S4CO00395',
        repName: 'Cory Gardner',
      }
    ]
  };
  
  render() {
    return (
      <div className="raceList">
      {this.state.races.map(race => (
        <Race key={race.demId} race={race} />
      ))}
      </div>
    )
  }
}

export default App;
