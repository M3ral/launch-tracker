### User Stories
#### • As a user, when I open the app, I want to see all the launches for the next 3 months, plotted on a map or globe. - Completed
I set up a redux store to handle the state management of the app, using the redux toolkit library.
I started by setting up the slice for the launches, with the initial state of the app and the 
asyncthunk to handle the API call to fetch all the launches.
After setting up redux as a state provider, I started working on the components for the app.
Installed the map library and created an account for the token.
Having the token set on the component, I just had to map the state from the store and pass it
to the Markers.

#### • As a user, I want to be able to see the first occurring launch depending on my start date and end date selection. - Completed
The app initially has the viewport set to zoom out with the longitude and latitude set both to 0, which enables the view of the entire map without the markers, but when ever the app
receives new items to show, it uses the first item’s props to set the viewport.

#### • As a user, I want to be able to select a start date and an end date so I can filter the launches according to my selection. - Completed
Every time the page is loaded (and when the values of the filter change), the Filter component dispatches an action to fetch all the launches, passing the date start and date
end as arguments.

#### • As a user, I want to be able to select a point on the map and see the name, time of launch, name of the launch pad and the agencies that are collaborating on the launch. - Completed
  When the user clicks on a Marker, it automatically passes the values of the launch assigned
  to that Marker to the Popover component, which is used to print the info required by the
  story.

#### • As a user, I want to receive feedback when the app is loading so that I know that when I change something in the UI, something is being loaded - Completed
I created the Feedback component, which is rendered in three different cases:
- When the app is loading.
- When the app has error.
- When there are no launches to show, given the dates by the user.

The Feedback component uses the store’s state to get the status of the API call and the
  metadata

#### • As a user, I want to receive feedback when the app encounters an error in reaching the API.
  See answer to the question above.

#### • As a user, I want to be able to filter the launches based on the agencies that are participating in the launches that are relevant to my selection of start and end date.
  The filter component would have a select with the agencies participating as options.
  I would create a custom selector with createSelector to store the agencies and pass them to
  the Select.

#### • As a user, I want to be able to filter the launches based on whether or not they were
  successful.
  The filter component would have a Checkbox to toggle between the successful ones and the
  unsuccessful ones.

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


