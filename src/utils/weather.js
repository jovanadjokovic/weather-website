const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e4659733d854696fda2aaf494ff2881e&query=' + latitude + ',' + longitude + '&units=m'
    request({url, json: true},(error,{body}) => {
        if (error) {
            callback('Network error', undefined)
        } else if (body.error) {
               callback('Error: Location doesn\'t exist ',undefined)
        } else { 
            callback(undefined, body.current.weather_descriptions[0]+'. it is '+ body.current.temperature +' degrees. It feels like '+ body.current.feelslike + ' degrees. Humidity is '+body.current.humidity+'%.' )
           }
    })
}

module.exports = weather