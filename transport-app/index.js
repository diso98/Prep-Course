const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = __dirname + '/data.json';

function loadData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveData(records) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2));
}

const app = express();
app.use(express.json());

app.get('/records', (req, res) => {
  const records = loadData();
  res.json(records);
});

app.post('/records', (req, res) => {
  const { driver, truck, kilometers, fuelLiters, hours } = req.body;
  if (!driver || !truck || kilometers == null || fuelLiters == null || hours == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const records = loadData();
  const newRecord = { id: uuidv4(), driver, truck, kilometers, fuelLiters, hours, date: new Date().toISOString() };
  records.push(newRecord);
  saveData(records);
  res.status(201).json(newRecord);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
