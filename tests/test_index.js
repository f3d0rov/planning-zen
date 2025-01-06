// Requests all compiled tests to be compiled by webpack
var testsContext = require.context ("../build/tests/", true, /.test.js$/);
testsContext.keys().forEach (testsContext);
