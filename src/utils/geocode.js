const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFtc2x5bG0iLCJhIjoiY2t2Zmlsdzg4YnI1dzMycTZib2MwdWkxMCJ9.qCMljldKdJKQ63NPFOKnXA&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Cannot connect to location service, Try again!', undefined)
        } else if (body.features.length === 0) {
            callback('No match found, please verify the given location!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode