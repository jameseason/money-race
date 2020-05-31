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
      <div>
      {this.state.races.map(race => (
        <Race key={race.demId} race={race} />
      ))}
      </div>
    )
  }
}

export default App;
