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
    repTotal: 0,
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
          repTotal: data.results[0].receipts,
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
    } else {
      this.callAPI();
      console.log('performed api call for '.concat(this.props.race.demId));
    }
  }

  render() {

    let demValue = this.props.onHand ? this.state.demOnHand : this.state.demTotal;
    let repValue = this.props.onHand ? this.state.repOnHand : this.state.repTotal;
    
    return (
      <div>
        <div className='stateName'>&nbsp;{this.props.race.state}&nbsp;</div>
        <div className='barBackground'> 
          {/* style={{height: (demValue + repValue) / 150000}} */}
        
          <div className='barDem' style={{width: (demValue / (demValue + repValue))*100 + '%'}}> 
          
            <img src={require('../images/' + this.props.race.demImg)} alt={this.state.repName}  className='portrait demPortrait' />
            <NumberFormat className='demDollarAmt' value={demValue} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
            
          </div>

          <div className='barRep' style={{width: (repValue / (demValue + repValue))*100 + '%'}}>  
          
            <NumberFormat className='repDollarAmt' value={repValue} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
            <img src={require('../images/' + this.props.race.repImg)} alt={this.state.repName} className='portrait repPortrait' />
            
          </div>
        </div>
        <div>
          <div className="demName">{this.state.demName}</div>
          <div className="repName">{this.state.repName}</div>
        </div>
      </div>
    )
  }
}

export default Race;