var Sails = require('sails');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(20000);
  
  Sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    global.sails = server;
    done(err, server);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});