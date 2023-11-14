const request = require('request')

const forecast = (latitude,longitude,callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=4b2f6de0aafdeaee0dc1cd24c05c8711&query='+ latitude +','+ longitude 
    request({url, json:true},(error,{body})=>{
        
            if(error){
                callback("Unable to connect to internet",undefined)
            }else if(body.error){
                callback("unable to search the location please try again ",undefined)    
            }else {
                callback(undefined,(
                    body.current.weather_descriptions[0]+' It is currently ' +
                    body.current.temperature + ' degress out. It feels like ' +
                    body.current.feelslike
                    
                ))
            }

    })
}

module.exports = forecast