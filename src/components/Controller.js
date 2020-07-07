import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Controller extends React.Component {
  
  render() {
    
    var sortByOptions = {
      closest: "Closest Race",
      rating: "Race Rating",
      state: "State Name",
      total: "Money in Race"
    };
    
    var ratingOptions = {
      tossup: "Tossup",
      lean: "Lean",
      likely: "Likely",
      solid: "Solid"
    };
    
    return(
      <div>

        {/* Cash on hand vs total raised toggle */}
        <div className = "controller-element">
        Value to display: <br />
          <ButtonGroup aria-label="Number to display">
            <Button variant="outline-secondary" onClick={event => this.props.onHandHandler(true)} className={`${this.props.onHand ? "active" : ""}`}>Cash on Hand</Button>
            <Button variant="outline-secondary" onClick={event => this.props.onHandHandler(false)} className={`${this.props.onHand ? "" : "active"}`}>Total Raised</Button>
          </ButtonGroup>
        </div>

        {/* Filter by race rating */}
        <div className = "controller-element">
          Race ratings to include: <br />
          
          {Object.keys(ratingOptions).map(key =>
            <React.Fragment key={key}>
              <Button variant="outline-secondary" onClick={event => this.props.toggleRating(key)} active={this.props.includeRating[key]}>{ratingOptions[key]}</Button>
              &nbsp;
            </React.Fragment>
          )}

        </div>
        
        
        {/* Sort by */}
        <div className = "controller-element">
          <DropdownButton
            id="sorting-drop-down"
            drop="down"
            variant="secondary"
            title={`Sort by ${sortByOptions[this.props.sortBy]}`}
            onSelect={event => this.props.sortByHandler(event)}
          >

            {Object.keys(sortByOptions).map(key =>
              <Dropdown.Item key={key} eventKey={key} active={this.props.sortBy === key}>{sortByOptions[key]}</Dropdown.Item>
            )}

          </DropdownButton>
        </div>
        
      </div>
    )
  }
  
}

export default Controller;