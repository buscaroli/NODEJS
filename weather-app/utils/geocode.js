const request = require('request');

const urlGeolocation = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const geoKey = 'pk.eyJ1IjoibW1vbnR5eTc4IiwiYSI6ImNrOTA0OGV3aDBrY20za2xjZzVvdnljdDcifQ.ZMTIRSb1979wtqmdVpt0Lg';

const town = process.argv[2];

const geocode = (address, callback) => {
    const url = urlGeolocation + encodeURIComponent(town) + '.json?access_token=' + geoKey;
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW1vbnR5eTc4IiwiYSI6ImNrOTA0OGV3aDBrY20za2xjZzVvdnljdDcifQ.ZMTIRSb1979wtqmdVpt0Lg';
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Bournemouth.json?access_token=pk.eyJ1IjoibW1vbnR5eTc4IiwiYSI6ImNrOTA0OGV3aDBrY20za2xjZzVvdnljdDcifQ.ZMTIRSb1979wtqmdVpt0Lg';
    request ({url: url, json: true}, (error, response) => {
        if (error) {
            callback ('Couldn\'t connect to the service.', undefined);
        } else if (response.body.features.length === 0) {
            callback ('Couldn\'t match the location.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1].toString(),
                longitude: response.body.features[0].center[0].toString(),
                location: response.body.features[0].place_name
            });
        }
        
    });
};



module.exports = {geocode,
                 town};