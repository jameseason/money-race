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
    'solidRep': 6
  }
  
  let aRating = ratingOrder[a.props['rating']];
  let bRating = ratingOrder[b.props['rating']];
  
  // if rating is equal, use state name
  if (aRating === bRating) {
    return compareStateName(a, b);
  } else {
    return aRating > bRating ? 1 : -1;
  }
}

const compareStateName = (a,b) => {
  let aRating = a.props['state'];
  let bRating = b.props['state'];
  
  if (aRating === bRating) {
    return 0;
  } else {
    return aRating > bRating ? 1 : -1;
  }
}

const Sort= ({children, by})=> {
  if (by === 'rating') {
    return React.Children.toArray(children).sort(compareRating);
  } else {
    return React.Children.toArray(children).sort(compareStateName);
  }

}

export default Sort;