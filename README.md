# Assignment

You've been invited to complete this coding assignment. We deliberately keep the assignment vague, leaving much room for you to make choices. Please document your design choices. Feel free to implement this in your own preferred tech stack. We do not expect you to spend days on this nor to build a full-blown application.

In this repository you'll find a server application which exposes two endpoints. One to fetch meter interval data, and another to submit a new entry.

We would like to ask you to build a frontend that:
* Visualises the meter interval data fetched from the server. We fully leave it up to you on how to design something for this.
* Has a way for a user to upload more meter interval data which is then also visualized.

## Running the server

```
cd server/
npm i
node app.js
```

It will expose a server app running on port: 3001.
Please inspect the sources to figure out how the endpoints work. Feel free to also adapt the server if you see fit.

# My assignment notes

## Chart data

For this assignment, I choose to simply show the data that I get from the API.

For that, I didn't add any verification for duplicated data (such as two intervals from a battery happening in the same date/time). This is as it is because that's technically not wrong from my point of view, since the battery has two interval entries.

As a next step related to duplicated data, I would check with the team/PO for a better view on this behavior and what are the requirements in this specific situation. Since I don't know all the details or the use cases, I would initially propose to add all the entries for the same date in the same bar of the chart, differentiating them by color, for example, in the case they have different consumption values. For the situation where both values (timestamp and kwh) are the same, I would consult if this is a bug in the API side or a feature that we want to support.
Overview of what was added

For sowing the data, I have the overview page and the detail page. Overview shows both batteries in the same chart, while the detail page shows a dedicated chart to that specific battery.

For the starting point, I choose to add the following things:

- Overview page: a good start where you can view all the data together.
- Battery detail page: a detail page where all the operations related to the battery are bundled together.
- Interval form: a simple form located in the detail page where you can add a new consumption entry to your battery
- Basic e2e tests: the project is very simple and straight forward, so I decided for e2e instead of unit testing since it's easy to test the whole flow. My units are very small and mostly for the presentation of the data.
- Adjusted server post method: added an error boundary in the post method so I could handle it in the app when needed (in case I try to add data to a battery that doesn't exist).
- Good navigation through keyboard, so you don't need to use the mouse (accessibility, yay!).
- Simple layout that's responsive.

## Things to do next

- Move MeterIntervalForm items to a separate component, to improve readability on the parent component.
- Setup MSW to test API response without hitting the API itself.
- Improve data fetch after insertion. Could fetch only new entries based on id/date depending on the structure of the data (avoid re-fetching all the data again after post request).

