# 2020 Senate Money Race
This project is intended to display financial information for 2020 Senate candidates. Deployed to https://jameseason.github.io/money-race

## Controller Options
On the left of the page, there are several options to change what is displayed.

### Value to display
This is a toggle between _Cash on Hand_ and _Total Raised_. _Cash on Hand_ is the amount of money that the candidate's committees had on hand at the end of the last reporting period. _Total Raised_ is the total amount of money that the candidate's committees had raised this cycle, as of the end of the last reporting period. To see when the end of the last reporting period was, hover over the dollar amount displayed for the candidate.

### Race ratings to include
[Politico's forecast](https://www.politico.com/2020-election/race-forecasts-and-predictions/senate/) groups the races into 4 categories of competitiveness: _Tossup_, _Lean_, _Likely_, _Solid_. Toggle whether races with a specific rating are filtered out by clicking one of these buttons. The rating for a race can be seen by hovering over the state silhouette. The color of the silhouette also indicates the rating.

### Sort by
Use this to change the sort order of the races.
* _Race Rating_: Sort the races by their race rating, from most competitive to least. Within each rating, races are grouped by lean-direction; Democratic favored races are listed first. To break ties within a race rating and lean-direction, state alphabetical order is used. This is the default sorting method.
* _State Name_: Sort alphabetically by state name
* _Money in Race_: Sort by the combined dollar amount of both displayed candidates. Highest combined amount will be shown first. Switching between displaying _Cash on Hand_ and _Total Raised_ may change this sorting.
* _Closest Race_: Sort by how close the candidate amounts raised are, as a percentage of the total amount raised by both candidates. In other words, how close the point that the bars meet is to the center. Switching between displaying _Cash on Hand_ and _Total Raised_ may change this sorting. 

## Sources
* Financial information is pulled from the [FEC API](https://api.open.fec.gov/developers/)
* Race ratings come from [Politico](https://www.politico.com/2020-election/race-forecasts-and-predictions/senate/)
* State silhouettes come from [StateFace](https://propublica.github.io/stateface/)
* Various icons come from [FontAwesome](https://fontawesome.com/)

## Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
