import React from 'react';
import NumberFormat from 'react-number-format';

class Race extends React.Component {

  render() {

    let demValue = this.props.onHand ? this.props.race.demOnHand : this.props.race.demTotal;
    let repValue = this.props.onHand ? this.props.race.repOnHand : this.props.race.repTotal;
    
    return (
      <div>
        <div className='stateName'>&nbsp;{this.props.race.state}&nbsp;</div>
        <div className='barBackground'> 
          {/* style={{height: (demValue + repValue) / 150000}} */}
        
          <div className='barDem' style={{width: (demValue / (demValue + repValue))*100 + '%'}}> 
          
            <img src={require('../images/' + this.props.race.demImg)} alt={this.props.race.repName}  className='portrait demPortrait' />
            <NumberFormat className='demDollarAmt' value={demValue} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
            
          </div>

          <div className='barRep' style={{width: (repValue / (demValue + repValue))*100 + '%'}}>  
          
            <NumberFormat className='repDollarAmt' value={repValue} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
            <img src={require('../images/' + this.props.race.repImg)} alt={this.props.race.repName} className='portrait repPortrait' />
            
          </div>
        </div>
        <div>
          <div className="demName">{this.props.race.demName}</div>
          <div className="repName">{this.props.race.repName}</div>
        </div>
      </div>
    )
  }
}

export default Race;