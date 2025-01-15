This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install the dependencies.

```bash
npm i
```

Create a `.env` file. Copy the variables from `.example.env` and fill in the values.

In a terminal tab, navigate to the server folder and run the server.

```bash
cd frontend-assignment-ana/server
node ./app.js
```

Then, in another terminal tab, navigate to the app root folder and run the development environment.

```bash
cd frontend-assignment-ana/app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tests

Currently there's only E2E tests with Cypress. It's recommended to run the built code for testing.

In a terminal tab, navigate to the app root folder and run the build script:

```bash
cd frontend-assignment-ana/app
npm run build && npm run start
```

Without closing the previous terminal, open another tab, navigate to the root of the project if needed, and run the test script:

```bash
cd frontend-assignment-ana/app
npm run cypress:open
```


## Packages
- [recharts](https://recharts.org/en-US/): lightweight chart package that's being used on the market. Has constant updates. Helps creating simple and customizable charts quickly with a focus on ease of use. Responsive.
- [react-hook-form](https://www.react-hook-form.com/): performant, flexible and extensible forms with easy-to-use validation.

## TODO
- Move MeterIntervalForm items to a separate component, to improve readability on the parent component;
- Setup MSW to test API response without hitting the API itself;
- Show a combined chart with the data from all batteries in the homepage;
- Improve data fetch after insertion. Could fetch only new entries based on id/date depending on the structure of the data (avoid refetching all the data again after post request);
- Use React Server Components (/app instead of /pages);

### Notes

Why E2E
- Validating critical workflows like adding new meter interval
- Ensuring data is persisted and displayed through multiple screens