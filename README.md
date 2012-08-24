# Dynomiter
A simple performance health monitoring app using Google PageSpeed Tools.

### Getting Started
* Add your Google API key to the source
* Install dependencies with NPM `npm install --start`
* Run the app with `node dynomiter.js` or as I have done setup the app on Heroku in their node environment

### Usage
To test a site open the url with the path `http://localhost:7357/test/testurl.com`.

### Monitoring
For scheduled monitoring I have used the Heroku Scheduler add-on to run daily tests. 
If a test fails my version triggers an Email and SMS alert.

## TODO
- Create additional test that includes other Google PageSpeed and WebPageTest.org information.