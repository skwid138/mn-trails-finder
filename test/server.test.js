var expect = require('chai').expect;
var request = require('request');

var url = 'http:///localhost:6660/'

describe('test for server file server.js', function () {
    describe('module route', function () {
        it('should serve index.html', function (done) {
            request(url, function (err, response, body) {
                console.log('body ->', body);
                // have to parse the body from JSON to a JS Obj
                expect(JSON.parse(body).result).to.eqaul([what module return should be]);
            // both expects need to be true for the test to pass
            expect(response.statusCode.to.be.equal(200));
            done();
        }) // end request
    }) // end it
}) // end 2nd describe

}); // end describe