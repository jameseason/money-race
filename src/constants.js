// App.js
export const title = '2020 Senate Money Race';
export const topText = `Money raised by each 2020 Senate candidate, rounded to 
the nearest dollar. State silhouettes are colored according to Politico's 
race predictions.`;
export const bottomText = `Data is from the most recent FEC filing. In cases 
where the primary is not decided, either the incumbent or the contender with 
the most cash on hand is used.`;
export const githubLink = 'https://github.com/jameseason/money-race';

// getData.js
export const latestBackupFile = 'response_0704.json';
export const fecBaseUrl = 'https://api.open.fec.gov/v1/candidates/totals/';
export const apiKey = '01S7pQx8JQPyWhG5lXIcG6QTgVh1ZQ87ITVH2gdH';
export const localStorageTime = 80000000;
export const localStorageName = 'raceInfo';