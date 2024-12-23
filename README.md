This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Intall the dependencies & be sure to have the API server open.

```bash
npm i
```

Then, run the development server(after running the API server in another terminal):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tests

Currently there's only E2E tests with Cypress. It's recommended to run the built code for testing.

In a terminal, run the build script:

```bash
npm run build && npm run start
```

Without closing the previous terminal, open a new terminal, navigate to the root of the project and run the test script:

```bash
npm run cypress:open
```


## Packages
- [recharts](https://recharts.org/en-US/): lightweight chart package that's beign used on the market. Has constant updates. Create simple and customizable charts quickly with a focus on ease of use. Responsive.
- [react-hook-form](https://www.react-hook-form.com/): performant, flexible and extensible forms with easy-to-use validation.

## TODO
- Have modal component to be an extention of the dialog DOM element, so I can reuse their methods (show, open, close);
- Hydrate a context with the meters so I can re-use it across the pages without having to fetch for data again;
- Move MeterIntervalForm items to a sepparate component, to improve redability on the parent component;
- Setup MSW to test API response without hitting the API intself;
- Show a combined chart with the data from all batteries in the homepage;


### Notes

Why E2E
- Validating critical workflows like authentication and purchasing
- Ensuring data is persisted and displayed through multiple screens
