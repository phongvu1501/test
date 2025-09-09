let sails = require('sails');
let rc = require('rc');

//Before running any tests...
before(function(done) {
    // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.

    this.timeout(50000);

    // Start server
    sails.lift(rc('sails'),err => {
        if(err) return done(err);
        done();
    });

    console.log("ENV: ", process.env.NODE_ENV);
});

// After all tests have finished...
after(function(done) {

    // here you can clear fixtures, etc.
    // (e.g. you might want to destroy the records you created above)
    console.log("App is going to finished");
  
    sails.lower(done);
    setTimeout(() => {
        process.exit(0)
    }, 5000)
  });