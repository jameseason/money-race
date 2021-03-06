import React from 'react';

// Compare by rating
const compareRating =(a, b) => {
  const ratingOrder = {
    'tossup': 0,
    'leanDem': 1,
    'leanRep': 2,
    'likelyDem': 3,
    'likelyRep': 4,
    'solidDem': 5,
    'solidRep': 6,
  };

  const aRating = ratingOrder[a.props['race']['rating']];
  const bRating = ratingOrder[b.props['race']['rating']];

  // if rating is equal, use state name
  if (aRating === bRating) {
    return compareStateName(a, b);
  } else {
    return aRating > bRating ? 1 : -1;
  }
};

// Compare by state name
const compareStateName = (a, b) => {
  const aRating = a.props['race']['state'];
  const bRating = b.props['race']['state'];

  if (aRating === bRating) {
    return 0;
  } else {
    return aRating > bRating ? 1 : -1;
  }
};

// Compare by combined total raised
const compareTotal = (a, b) => {
  const aRating = a.props['race']['demTotal'] + a.props['race']['repTotal'];
  const bRating = b.props['race']['demTotal'] + b.props['race']['repTotal'];

  if (aRating === bRating) {
    return 0;
  } else {
    return aRating < bRating ? 1 : -1;
  }
};

// Compare by combined cash on hand
const compareOnHand = (a, b) => {
  const aRating = a.props['race']['demOnHand'] + a.props['race']['repOnHand'];
  const bRating = b.props['race']['demOnHand'] + b.props['race']['repOnHand'];

  if (aRating === bRating) {
    return 0;
  } else {
    return aRating < bRating ? 1 : -1;
  }
};

// Compare by closest total raised
const compareClosestTotal = (a, b) => {
  const raceA = a.props['race'];
  const raceB = b.props['race'];
  const aRating = Math.abs(raceA['demTotal'] - raceA['repTotal']) / (raceA['demTotal'] + raceA['repTotal']);
  const bRating = Math.abs(raceB['demTotal'] - raceB['repTotal'])/ (raceB['demTotal'] + raceB['repTotal']);

  if (aRating === bRating) {
    return 0;
  } else {
    return aRating > bRating ? 1 : -1;
  }
};

// Compare by closest cash on hand
const compareClosestOnHand = (a, b) => {
  const raceA = a.props['race'];
  const raceB = b.props['race'];
  const aRating = Math.abs(raceA['demOnHand'] - raceA['repOnHand']) / (raceA['demOnHand'] + raceA['repOnHand']);
  const bRating = Math.abs(raceB['demOnHand'] - raceB['repOnHand'])/ (raceB['demOnHand'] + raceB['repOnHand']);

  if (aRating === bRating) {
    return 0;
  } else {
    return aRating > bRating ? 1 : -1;
  }
};


const Sort = ({children, by, onHand})=> {
  const childArray = React.Children.toArray(children);

  switch (by) {
    case 'rating': return childArray.sort(compareRating);
    case 'total': return onHand ? childArray.sort(compareOnHand) : childArray.sort(compareTotal);
    case 'closest': return onHand ? childArray.sort(compareClosestOnHand) : childArray.sort(compareClosestTotal);
    case 'state': return childArray.sort(compareStateName);
    default:
      console.log('unexpected sort by: ' + by);
      return childArray.sort(compareRating);
  }
};

export default Sort;
