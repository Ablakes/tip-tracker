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

    // First socket: tip-report-service on port 5555
    const reportSock = new zmq.Request();
    reportSock.connect('tcp://127.0.0.1:5555');
    await reportSock.send('report');
    const [reportResponse] = await reportSock.receive();
    const reportData = JSON.parse(reportResponse.toString());
    await reportSock.close();

    // Second socket: income-analysis-service on port 5556
    const analysisSock = new zmq.Request();
    analysisSock.connect('tcp://127.0.0.1:5556');
    await analysisSock.send('analyze');
    const [analysisResponse] = await analysisSock.receive();
    const analysisData = JSON.parse(analysisResponse.toString());
    await analysisSock.close();

    // Combine results
    const result = {
      ...reportData,
      ...analysisData,
    };

    res.json(result);
  } catch (err) {
    console.error("Error in adapter:", err);
    res.status(500).json({ error: 'Failed to generate combined report.' });
  }
});

app.listen(PORT, () => {
  console.log(`Adapter running at http://localhost:${PORT}`);
});
