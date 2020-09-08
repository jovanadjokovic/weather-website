const request = require('request')

const geocode = (adress, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1Ijoiam92YW5pY2FwYW1ldG5pY2EiLCJhIjoiY2tlYmI1NXRzMDcxazJycGc0amYxcjhiayJ9.iyh71vv8raUBMxpY-1PUjA&limit=1'
    request({url, json: true},(error,{body}) => {
        if (error) {
            callback('Network error', undefined)
        } else if (body.features.length===0) {
            callback('Lose unet grad',undefined)
        } else {
                const data = {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                }
                callback(undefined,data)
        }
    })
}


module.exports = geocode