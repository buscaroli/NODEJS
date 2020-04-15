const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


geocode.geocode(forecast.town, (error, data) => {
    if (error) {
        console.log('Error: ' + error);
    } else{
        forecast(data.latitude, data.longitude, (error, data) => {
    
            if (error) {
                console.log('Error: ' + error);
            } else {
                console.log('Location: ' + data.location + ', ' + data.country + '.')
                console.log('Temperature: ' + data.temperature + ' C.');
                console.log('Wind Speed: ', + data.wind_speed + ' Km/h');
                console.log('UV Index: ' + data.uv_index);
            }
            
        });
    }
    
});

