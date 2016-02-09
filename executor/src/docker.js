var Docker = require('dockerode');
var stream = require('stream');

var docker = new Docker({socketPath: '/var/run/docker.sock', timeout: 4000});

export function run(cmd, input = null) {
  return new Promise(function(resolve, reject) {
    docker.createContainer({
      Image: 'api-runner',
      Cmd: [cmd, input]
    }, function(err, container) {
      container.start({}, function(err, data) {
        var output = {
          console: [],
          result: null,
        }
        var logStream = new stream.PassThrough();
        logStream.on('data', function(chunk){
          var log = chunk.toString();
          if ((/^RESULT::: /).test(log)) {
            output.result = log.replace(/([\s\S]*)\n/, "$1").replace('RESULT::: ', '');
          } else {
            log = log.replace(/([\s\S]*)\n/, "$1");
            output.console.push(log);
          }
        });

        container.logs({
          follow: true,
          stdout: true,
          stderr: true
        }, function(err, stream){
          if(err) {
            return logger.error(err.message);
          }
          container.modem.demuxStream(stream, logStream, logStream);
          stream.on('end', function() {
            resolve(output);
            container.remove(function (err, data) {});
          });
        });
      });
    });

  });
}
