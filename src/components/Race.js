import React from 'react';
import NumberFormat from 'react-number-format';

class Race extends React.Component {
// props: race: demId, repId, state

  state = {
    apiKey: '01S7pQx8JQPyWhG5lXIcG6QTgVh1ZQ87ITVH2gdH',
    demName: '',
    demOnHand: 0,
    demTotal: 0,
    demPercent: 0,
    repName: '',
    repOnHand: 0,
    repTotal: 0,
    repPercent: 0
  };

  /**
  * Perform API calls to populate the state
  */
  callAPI() {
    const ls = require('localstorage-ttl');

    // democrat
    fetch('https://api.open.fec.gov/v1/candidate/' + this.props.race.demId + '/totals/?cycle=2020&page=1&api_key=' + this.state.apiKey)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          demName: this.props.race.demName,
          demOnHand: data.results[0].last_cash_on_hand_end_period,
          demTotal: data.results[0].receipts,
        });

        ls.set(this.props.race.demId, JSON.stringify(this.state), 84000000);
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

        ls.set(this.props.race.demId, JSON.stringify(this.state), 84000000);
      })
      .catch(console.log)  
  }
  
  componentDidMount() {
    
    //localStorage.removeItem(this.props.race.demId)

    const ls = require('localstorage-ttl');
    const s = ls.get(this.props.race.demId);

    if (s != null) {
      this.setState(JSON.parse(s));
      console.log('grabbed from storage '.concat(this.props.race.demId));
    } else {
      this.callAPI();
      console.log('performed api call for '.concat(this.props.race.demId));
    }
    
    this.setState({
      demPercent: (this.state.demOnHand / (this.state.demOnHand + this.state.repOnHand)) * 100,
      repPercent: (this.state.repOnHand / (this.state.demOnHand + this.state.repOnHand)) * 100
    });
  }

  render() {
    return (
      <div className='barBackground'>
      {/*  <p>
          Democrat: {this.state.demName} has <NumberFormat value={this.state.demOnHand} displayType={'text'} thousandSeparator={true} prefix={'$'} /> on hand.
        </p>
        <p>
          Republican: {this.state.repName} has <NumberFormat value={this.state.repOnHand} displayType={'text'} thousandSeparator={true} prefix={'$'} /> on hand.
      </p> */}
        <img src={require('../images/' + this.props.race.demImg)} alt={this.state.repName}  className='portrait' />
        <div className='barBackground'>
          <div className='barDem' style={{width: (this.state.demOnHand / (this.state.demOnHand + this.state.repOnHand))*100 + '%'}}>  
            <NumberFormat value={this.state.demOnHand} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
          </div>
          <div className='barRep' style={{width: (this.state.repOnHand / (this.state.demOnHand + this.state.repOnHand))*100 + '%'}}>  
            <NumberFormat value={this.state.repOnHand} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
          </div>
        </div>
  <img src={require('../images/' + this.props.race.repImg)} alt={this.state.repName} className='portrait' />
      </div>
    )
  }
}

export default Race;