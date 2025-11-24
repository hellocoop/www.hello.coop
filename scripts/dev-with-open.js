const { spawn } = require('child_process');
const waitOn = require('wait-on');
const open = require('open-cli');

const nextDev = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true
});

waitOn({
  resources: ['http://localhost:3000'],
  timeout: 60000
}).then(() => {
  open('http://localhost:3000');
}).catch((err) => {
  console.error('Error waiting for server:', err);
  process.exit(1);
});

nextDev.on('exit', (code) => {
  process.exit(code);
});

