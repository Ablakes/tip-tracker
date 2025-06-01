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
    // Write shifts.json to project root
    fs.writeFileSync('shifts.json', JSON.stringify(payload, null, 2));
    console.log("shifts.json written to disk");

    const sock = new zmq.Request();
    sock.connect('tcp://127.0.0.1:5555');
    console.log("📡 Connected to microservice on port 5555");
    await sock.send('report');
    console.log("📤 Sent ZMQ message");

    const [response] = await sock.receive();
    console.log("Received response from microservice");

    const report = JSON.parse(response.toString());
    res.json(report);
    await sock.close();
  } catch (err) {
    console.error("Error in adapter.js:", err);
    res.status(500).json({ error: 'Failed to generate report.' });
  }
});

app.listen(PORT, () => {
  console.log(`Adapter listening at http://localhost:${PORT}`);
});
