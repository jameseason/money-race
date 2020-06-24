import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

// TODO: Make the controller prettier
class Controller extends React.Component {
  
  render() {
    
    return(
      <div>
      
        {/* Cash on hand vs total raised toggle */}
        <div className = "controller-element">
        Value to display: <br />
          <ButtonGroup aria-label="Number to display">
            <Button variant="secondary" onClick={event => this.props.onHandHandler(true)} className={`${this.props.onHand ? "active" : ""}`}>Cash on Hand</Button>
            <Button variant="secondary" onClick={event => this.props.onHandHandler(false)} className={`${this.props.onHand ? "" : "active"}`}>Total Raised</Button>
          </ButtonGroup>
        </div>
        
        {/* Filter by race rating */}
        <div className = "controller-element">
          Race ratings to include: <br />
          <Button variant="secondary" onClick={event => this.props.toggleTossup(event)} active={this.props.includeTossup ? true : false}>Tossup</Button>&nbsp;
          <Button variant="secondary" onClick={event => this.props.toggleLean(event)} active={this.props.includeLean ? true : false}>Lean</Button>&nbsp;
          <Button variant="secondary" onClick={event => this.props.toggleLikely(event)} active={this.props.includeLikely ? true : false}>Likely</Button>&nbsp;
          <Button variant="secondary" onClick={event => this.props.toggleSolid(event)} active={this.props.includeSolid ? true : false}>Solid</Button>&nbsp;
        </div>
        
        
        {/* Sort by */}
        <div className = "controller-element">
          <DropdownButton
            id="sorting-drop-down"
            drop="down"
            variant="secondary"
            title="Sort by"
            onSelect={event => this.props.sortByHandler(event)}
          >
            <Dropdown.Item eventKey="rating" active={this.props.sortBy === "rating" ? true : false}>Race Rating</Dropdown.Item>
            <Dropdown.Item eventKey="state" active={this.props.sortBy === "state" ? true : false}>State Name</Dropdown.Item>
            <Dropdown.Item eventKey="total" active={this.props.sortBy === "total" ? true : false}>Money in Race</Dropdown.Item>
            <Dropdown.Item eventKey="closest" active={this.props.sortBy === "closest" ? true : false}>Closest Race</Dropdown.Item>
          </DropdownButton>
        </div>
        
      </div>
    )
  }
  
}

export default Controller;