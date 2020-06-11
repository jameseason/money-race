export const getData = (setRaces) => {
  
  // check local storage first. uncomment the following to force an API call: // 
  localStorage.removeItem('raceInfo');
  const ls = require('localstorage-ttl');
  const storageResults = ls.get('raceInfo');
  if (storageResults != null) {
    setRaces(JSON.parse(storageResults));
    // console.log("found race info in storage"); // debug
    return;
  }
  
  
  // get basic candidate info from candidateInfo.js
  let raceInfo = require('./data/candidateInfo.js').default.races;
  
  // build the URL to send the request to
  let baseUrl = new URL('https://api.open.fec.gov/v1/candidates/totals/');
  let searchParams = baseUrl.searchParams;
  searchParams.set('cycle', '2020');
  searchParams.set('office', 'S');
  searchParams.set('per_page', '100');
  searchParams.set('is_active_candidate', 'true');
  searchParams.set('page', '1');
  searchParams.set('api_key', '01S7pQx8JQPyWhG5lXIcG6QTgVh1ZQ87ITVH2gdH');

  // add every candidate id to the url
  var race;
  for (race of raceInfo) {
    searchParams.append('candidate_id', race.demId);
    searchParams.append('candidate_id', race.repId);
  }

  baseUrl.search = searchParams.toString();

  // perform the API call
  let apiResults = {};
  fetch(baseUrl.toString())
    .then(res => res.json())
    .then((response) => {
      // parse the response and populate the appropriate raceInfo financial numbers
      
      // store results by candidate in apiResults
      var result;
      for (result of response.results) {
        apiResults[result.candidate_id] = {
          total: result.receipts,
          onHand: result.cash_on_hand_end_period,
        }
      }

      // populate the appropriate raceInfo numbers from apiResults
      for (race of raceInfo) {
        race.demOnHand = apiResults[race.demId].onHand;
        race.demTotal = apiResults[race.demId].total;
        race.repOnHand = apiResults[race.repId].onHand;
        race.repTotal = apiResults[race.repId].total;
      }
      
      // store the api call for about a day
      ls.set('raceInfo', JSON.stringify(raceInfo), 80000000);

      // setRaces will set the state in App.js
      setRaces(raceInfo);
      // console.log("api call performed"); // debug
    })
    .catch(console.log);
}
