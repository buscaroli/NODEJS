const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

/*********************************************************************
 * In case we come across an error in the first callback (geocode)
 * we don't want to proceed and try to display the (undefined) data
 * inside the forecast callback.
 * 
 * In this case we have done this by simply enclosing the second
 * callback within an 'else' statement, so it will only get executed
 * if there is no error.
 * 

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

******************************************************************************* */


/*********************************************************************
 * In case we come across an error in the first callback (geocode)
 * we don't want to proceed and try to display the (undefined) data
 * inside the forecast callback.
 * 
 * In this case we have use a different but common pattern that is
 * worth bearing in mind:
 * In case of an error we 'return' the console.log call.
 * In fact the return statement  can be called only one in any given
 * function, if it's called in the case of an error we are sure that
 * the rest of the function won't be called.
 * 
 ******************************************************************* */

geocode.geocode(forecast.town, (error, data) => {
    if (error) {
        return console.log('Error: ' + error);
    } 
    forecast(data.latitude, data.longitude, (error, forecastData) => {

        if (error) {
            return console.log('Error: ' + error);
        } 

        console.log('Location: ' + data.location + '.')
        console.log('Temperature: ' + forecastData.temperature + ' C.');
        console.log('Wind Speed: ', + forecastData.wind_speed + ' Km/h');
        console.log('UV Index: ' + forecastData.uv_index);
        
        
    });

    
});

