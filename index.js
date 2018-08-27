const spawnSync = require('child_process').spawnSync;
const Pusher = require('pusher-js');

// pigs s 2 1000
// sleep 0.2
// pigs s 2 500
// sleep 0.200


const pigs = (port, pulseWidth) => spawnSync('/usr/bin/pigs', ['s', port, pulseWidth]);
const sleep = (time) => spawnSync('/bin/sleep', [ time ]);

var pusher = new Pusher('9a623842c1ef5ef79f53', {
  cluster: 'us2',
  encrypted: true
});


// Subscribe to gong channel
var channel = pusher.subscribe('gong');
const startStep = 800;

pigs('2', startStep);

channel.bind('hit', function(data) {
  console.log(`gong:hit: ${JSON.stringify(data)}`);
  const count = Math.min(3, data.count);
  const delay = data.delay || 0.2; //Math.max(0.15, data.delay || 0);

  for(var i = 0; i < count; i++) {
    pigs('2', '1100');
    sleep('0.15');
    pigs('2', startStep);
    sleep(delay);
  }
});

