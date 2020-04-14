const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


geocode.geocode(forecast.town, (error, data) => {
    if (error) {
        console.log('Error: ' + error);
    } else{
        console.log('Name: ' + data.location);
    console.log('Latitude: ' + (data.latitude) + ', Longitude: ' + data.longitude + '.');
    }
    
});

forecast(51.5074, -0.1278, (error, data) => {
    console.log('Values HardCoded for London:')
    if (error) {
        console.log('Error: ' + error);
    } else {
        console.log('Temperature: ' + data.temperature + 'C.');
        console.log('Wind Speed: ', + data.wind_speed + 'Km/h');
        console.log('UV Index: ' + data.uv_index);
    }
    
});