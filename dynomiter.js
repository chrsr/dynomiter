var restify = require("restify");

var server;
var dynomiter = (function () {

    var constants = {
            API_KEY: "", // add your Google API key
            API_URL: "https://www.googleapis.com"
        },
        testUrl;

    function log (msg) {
        var date = new Date();
        console.log(msg + " " + date.toTimeString() + " " + date.toDateString());
    }

    function googlePageSpeedTest (req, res, next) {
        var url = "http://" + req.params.url,
            client,
            path = "/pagespeedonline/v1/runPagespeed?url=" + encodeURIComponent(url) +
                   "&key=" + constants.API_KEY +
                   "&strategy=desktop";
        testUrl = url;
        log("Testing " + url);
        client = restify.createJsonClient({
            url: constants.API_URL
        });
        client.get(path, function(err, req, res, data) {
            if(data && data.formattedResults.ruleResults) {
                checkGzip(data.formattedResults.ruleResults.EnableGzipCompression);
            } else {
                log("Testing failed");
            }
        });
        res.send("Testing complete");
    }

    function checkGzip (gzipData) {
        log("Checking for GZIP");
        if(gzipData.urlBlocks !== undefined) {
            log("GZIP not detected");
            sendWarning("Warning: GZIP is currently off for " + testUrl);
        }
    }

    function sendWarning (msg) {
        log("Sending warning email");
        // for my purpose I sent an email to ifttt
        // and setup an SMS recipe for notifications
    }

    return {
        test: googlePageSpeedTest,
        log: log
    };

}());

server = restify.createServer({
    name: "Dynomiter"
});
server.listen(process.env.PORT || 7357);
server.get('/test/:url', dynomiter.test);

if(server) {
    dynomiter.log("PageSpeed server started");
}