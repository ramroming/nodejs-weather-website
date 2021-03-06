const request = require('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=fcb94a0ea9bd8ae22fc47c150ca6f793&query=' +  encodeURI(latitude) + ',' +  encodeURI(longitude)

    request({
        url,
        json: true
    }, (error, {body}) => {

        if (error) {
           callback('Unable to connect to weather service',undefined)
        } else if (body.error) {
           callback('unable to find location',undefined)

        } else {
          
            console.log(body)
            callback( undefined, {
                forecastDesc: "The weather is " + body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. And it feels like " + body.current.feelslike + " degrees out",
                iconUrl:  body.current.weather_icons[0]
            
            })
           
        }
    })

}

module.exports = forecast