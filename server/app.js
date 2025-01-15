const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

var jsonParser = bodyParser.json();

const meters = [
  {
    id: '1',
    name: 'Battery A',
    intervals: [
      {
        timestamp: 1635757200,
        kwh: 20,
      },
      {
        timestamp: 1635758100,
        kwh: 30,
      },
      {
        timestamp: 1635759000,
        kwh: 35,
      },
      {
        timestamp: 1635759900,
        kwh: 37,
      },
      {
        timestamp: 1635760800,
        kwh: 38,
      },
      {
        timestamp: 1635761700,
        kwh: 45,
      },
      {
        timestamp: 1635762600,
        kwh: 52,
      },
      {
        timestamp: 1635763500,
        kwh: 55,
      },
      {
        timestamp: 1635764400,
        kwh: 60,
      },
      {
        timestamp: 1635765300,
        kwh: 65,
      },
    ],
  },
  {
    id: '2',
    name: 'Battery B',
    intervals: [
      {
        timestamp: 1635757200,
        kwh: 60,
      },
      {
        timestamp: 1635758100,
        kwh: 62,
      },
      {
        timestamp: 1635759000,
        kwh: 70,
      },
      {
        timestamp: 1635759900,
        kwh: 75,
      },
      {
        timestamp: 1635760800,
        kwh: 77,
      },
      {
        timestamp: 1635761700,
        kwh: 79,
      },
      {
        timestamp: 1635762600,
        kwh: 85,
      },
      {
        timestamp: 1635763500,
        kwh: 95,
      },
      {
        timestamp: 1635764400,
        kwh: 120,
      },
      {
        timestamp: 1635765300,
        kwh: 125,
      },
    ],
  },
];

app.get('/', (req, res) => {
  res.send(
    'Sample server application. Please use the /meters endpoint to fetch meter interval data and post to upload more data.'
  );
});

// returns all the meters data
app.get('/meters', (req, res) => {
  res.json(meters);
});

// updates meter data (based on id)
app.post('/meters/:id', jsonParser, (req, res) => {
  const meter = meters.find((m) => m.id === req.params.id);

  if (!meter) {
    res.status(404).send(
      JSON.stringify({
        message: `Unable to find meter with id  ${req.params.id}`,
      })
    );
    return;
  }

  if (meter) {
    meter.intervals.push({
      timestamp: req.body.timestamp,
      kwh: req.body.kwh,
    });
  }
  
  res.send(meter);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

