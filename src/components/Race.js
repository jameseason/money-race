import React from 'react';
import NumberFormat from 'react-number-format';

class Race extends React.Component {
  render() {
    const demValue = this.props.onHand ? this.props.race.demOnHand : this.props.race.demTotal;
    const repValue = this.props.onHand ? this.props.race.repOnHand : this.props.race.repTotal;

    return (
      <div>
        <div className='stateName'>&nbsp;{this.props.race.state}&nbsp;</div>

        <div className='barBackground'>

          <div className='barDem' style={{width: (demValue / (demValue + repValue))*100 + '%'}}>

            <div className='barContents demContents'>
              <img src={require('../images/' + this.props.race.demImg)} alt={this.props.race.demName} className='portrait' draggable="false" />

              <span className='hover'>
                <NumberFormat value={demValue} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
                <span className='hovertext coverageEndText'>&nbsp;As of {this.props.race.demCoverageEnd}&nbsp;</span>
              </span>
            </div>

          </div>

          <div className='barRep' style={{width: (repValue / (demValue + repValue))*100 + '%'}}>

            <div className='barContents repContents'>
              <span className='hover'>
                <NumberFormat value={repValue} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
                <span className='hovertext coverageEndText'>&nbsp;As of {this.props.race.repCoverageEnd}&nbsp;</span>
              </span>

              <img src={require('../images/' + this.props.race.repImg)} alt={this.props.race.repName} className='portrait' draggable="false" />
            </div>
          </div>
        </div>

        {/* candidate names */}
        <div>
          <div className="demName">{this.props.race.demName} &nbsp;
            { /* show donation link if there is one */
              this.props.race.demDonate != null ?
              <span className="hover"><a href={this.props.race.demDonate} target="_blank" rel="noopener noreferrer"><i className="fas fa-donate"></i><span className="hovertext">Donate</span></a></span> :
              null
            }
          </div>
          <div className="repName">{this.props.race.repName}</div>
        </div>
      </div>
    );
  }
}

export default Race;
