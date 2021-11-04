const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a78e8e27d1fab98a09bb5e4e74e5c136&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service, try again', undefined)
        } else if (body.error) {
            callback('No match found, please verify the given coordinates', undefined);
        } else {
            callback(undefined, {
                weatherDesc: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast