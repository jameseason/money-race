import React from 'react';
import NumberFormat from 'react-number-format';

class Race extends React.Component {
// props: race: demId, repId, state

  state = {
    apiKey: '01S7pQx8JQPyWhG5lXIcG6QTgVh1ZQ87ITVH2gdH',
    demName: '',
    demOnHand: 0,
    demTotal: 0,
    repName: '',
    repOnHand: 0,
    repTotal: 0
  };

  /**
  * Perform API calls to populate the state
  */
  callAPI() {
    // democrat
    fetch('https://api.open.fec.gov/v1/candidate/' + this.props.race.demId + '/totals/?cycle=2020&page=1&api_key=' + this.state.apiKey)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          demName: this.props.race.demName,
          demOnHand: data.results[0].last_cash_on_hand_end_period,
          demTotal: data.results[0].receipts
        })
      })
      .catch(console.log)
      
    
    // republican
    fetch('https://api.open.fec.gov/v1/candidate/' + this.props.race.repId + '/totals/?cycle=2020&page=1&api_key=' + this.state.apiKey)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          repName: this.props.race.repName,
          repOnHand: data.results[0].last_cash_on_hand_end_period,
          repTotal: data.results[0].receipts
        });
        
        // Store state after this call
        const ls = require('localstorage-ttl');
        ls.set(this.props.race.demId, JSON.stringify(this.state), 84000000);
      })
      .catch(console.log)  
  }
  
  componentDidMount() {

    const ls = require('localstorage-ttl');
    const s = ls.get(this.props.race.demId);

    if (s != null) {
      this.setState(JSON.parse(s));
      console.log('grabbed from storage '.concat(this.props.race.demId));
    } else {
      this.callAPI();
      console.log('performed api call for '.concat(this.props.race.demId));
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.race.state}</h1>
        <p>
          Democrat: {this.state.demName} has <NumberFormat value={this.state.demOnHand} displayType={'text'} thousandSeparator={true} prefix={'$'} /> on hand.
        </p>
        <p>
          Republican: {this.state.repName} has <NumberFormat value={this.state.repOnHand} displayType={'text'} thousandSeparator={true} prefix={'$'} /> on hand.
        </p>
      </div>
    )
  }
}

export default Race;