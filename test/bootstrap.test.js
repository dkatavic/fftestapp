var Sails = require('sails');

before(function(done) {
  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(10000);
  
  Sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    if (err) {
      return done(err);
    }
    // here you can load fixtures, etc.
    done(null, server);
  });
});

after(function(done) {
  Sails.lower(done);
});