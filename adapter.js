const express = require('express');
const zmq = require('zeromq');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.post('/api/report', async (req, res) => {
  const payload = req.body;

  try {
    // Write to shifts.json
    fs.writeFileSync('shifts.json', JSON.stringify(payload, null, 2));
    console.log("shifts.json written");

    // Call all 3 services
    const result = {};

    // 1. tip-report-service (port 5555)
    const reportSock = new zmq.Request();
    reportSock.connect('tcp://127.0.0.1:5555');
    await reportSock.send('report');
    const [reportResponse] = await reportSock.receive();
    Object.assign(result, JSON.parse(reportResponse.toString()));
    await reportSock.close();

    // 2. income-analysis-service (port 5556)
    const analysisSock = new zmq.Request();
    analysisSock.connect('tcp://127.0.0.1:5556');
    await analysisSock.send('analyze');
    const [analysisResponse] = await analysisSock.receive();
    Object.assign(result, JSON.parse(analysisResponse.toString()));
    await analysisSock.close();

    // 3. weekday-analysis-service (port 5557)
    const weekdaySock = new zmq.Request();
    weekdaySock.connect('tcp://127.0.0.1:5557');
    await weekdaySock.send('weekday');
    const [weekdayResponse] = await weekdaySock.receive();
    Object.assign(result, JSON.parse(weekdayResponse.toString()));
    await weekdaySock.close();

    res.json(result);
  } catch (err) {
    console.error("Error in adapter:", err);
    res.status(500).json({ error: 'Failed to generate report.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Adapter running at http://localhost:${PORT}`);
});
