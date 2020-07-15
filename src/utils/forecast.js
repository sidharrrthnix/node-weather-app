const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7351a46309aeb238048af77bcbe30c5f&query=' + latitude + ',' + longitude + '&units=m'

    request({
        url,
        json: true
    }, (error, {
        body
    } = {}) => {
        if (error) {
            callback('No internet connection found,please check your connection', undefined)
        } else if (body.error) {
            callback('Unable to find the location , please check the URL carefully', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. The temperature is currently ' + body.current.temperature + ', It feels like ' + body.current.feelslike + '. The chances of rain is ' + body.current.precip + ' %')
        }
    })
}

module.exports = forecast