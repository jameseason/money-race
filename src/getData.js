import * as Constants from './constants';

export const getData = (setRaces) => {
  /* Parse the response and populate the appropriate raceInfo financial numbers */
  function handleFecResponse(raceInfo, response) {
    // store results by candidate in apiResults
    const apiResults = {};
    let result;
    for (result of response.results) {
      apiResults[result.candidate_id] = {
        total: result.receipts,
        onHand: result.cash_on_hand_end_period,
        asOf: result.coverage_end_date,
      };
    }

    // populate the appropriate raceInfo numbers from apiResults
    let race;
    for (race of raceInfo) {
      race.demOnHand = apiResults[race.demId].onHand;
      race.demTotal = apiResults[race.demId].total;
      race.demCoverageEnd = new Date(apiResults[race.demId].asOf).toDateString().substring(4);

      race.repOnHand = apiResults[race.repId].onHand;
      race.repTotal = apiResults[race.repId].total;
      race.repCoverageEnd = new Date(apiResults[race.repId].asOf).toDateString().substring(4);
    }

    // store the api call for about a day
    ls.set('raceInfo', JSON.stringify(raceInfo), Constants.localStorageTime);

    // setRaces will set the state in App.js
    setRaces(raceInfo);
  }

  /* Build the URL to send the FEC request to */
  function buildURL(raceInfo) {
    const baseUrl = new URL(Constants.fecBaseUrl);
    const searchParams = baseUrl.searchParams;
    searchParams.set('cycle', '2020');
    searchParams.set('office', 'S');
    searchParams.set('per_page', '100');
    searchParams.set('is_active_candidate', 'true');
    searchParams.set('page', '1');
    searchParams.set('api_key', Constants.apiKey);

    // add every candidate id to the url
    let race;
    for (race of raceInfo) {
      searchParams.append('candidate_id', race.demId);
      searchParams.append('candidate_id', race.repId);
    }

    baseUrl.search = searchParams.toString();
    return baseUrl.toString();
  }

  // check local storage first
  const ls = require('localstorage-ttl');
  const storageResults = ls.get('raceInfo');
  if (storageResults != null) {
    setRaces(JSON.parse(storageResults));
    return;
  }

  // get basic candidate info from candidateInfo.js
  const raceInfo = require('./data/candidateInfo.js').default.races;

  // build URL for fec call
  const url = buildURL(raceInfo);

  // perform the API call
  fetch(url)
      .then((res) => res.json())
      .then((response) => {
        handleFecResponse(raceInfo, response);
      })
      .catch(function() {
      // Use the latest saved data if we've hit the API limit
        handleFecResponse(raceInfo, require('./data/' + Constants.latestBackupFile));
      });
};
