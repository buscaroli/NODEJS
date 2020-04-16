/**********************************************************************************
 * LEARNING NODEJS
 * Based on a Udemy video from Andrew Mead
 * 
 * Using a geolocation service's API (mapbox) and a weather forecast service's
 * API (weatherstack) to get some information on a user specified location.
 * 
 * USE: node app.js 'location name'
 * 
 * TODO: At the moment weatherstack takes a long time to respond and sometimes
 *      responds with an error object. Same happens if submitting the request
 *      through the browser which means it's not a problem of the script.
 *      Maybe I'll look into a different forecast provider if not solved in the
 *      near future (currently April 2020).
 *
 * Matteo
 * 
 *********************************************************************************/

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


geocode.geocode(forecast.town, (error, { latitude, longitude, location }) => {
    if (error) {
        return console.log('Error: ' + error);
    } 
    forecast(latitude, longitude, (error, { temperature, wind_speed, uv_index }) => {

        if (error) {
            return console.log('Error: ' + error);
        } 
        
        console.log('Location: ' + location + '.')
        console.log('Temperature: ' + temperature + ' C.');
        console.log('Wind Speed: ', + wind_speed + ' Km/h');
        console.log('UV Index: ' + uv_index);
        
        
    });

    
});

