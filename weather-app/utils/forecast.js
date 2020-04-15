const request = require('request');

const urlWeather = 'http://api.weatherstack.com/current?access_key=da6e6792949a049a66c03f2ea369434c';

const forecast = (latitude, longitude, callback) => {
    const url = urlWeather + '&query=' + latitude + ',' + longitude;
    request ({url: url, json:true}, (error, response) => {
        if (error) {
            callback ('Culdn\'t reach the Weather Forecast Service.', undefined);
        } else if (response.body.error){
            callback('Couldn\'t Access Forecast Data for the Location, try a different area.', undefined);
        } else {
            callback(undefined, {
                    location:       response.body.location.name,
                    country:        response.body.location.country,
                    temperature:    response.body.current.temperature,
                    wind_speed:     response.body.current.wind_speed,
                    uv_index:       response.body.current.uv_index
                    })
        }
    });
}


module.exports = forecast;