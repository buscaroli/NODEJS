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

