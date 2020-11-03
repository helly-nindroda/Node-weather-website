const request = require('request');

const forecast =(longitude,latitude,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=a70777a7a250b736df6aefe68d166fb2&units=metric';

    request({url,json:true},(error,{body})=>{
     
         if(error)
         {
             callback('Unable to fetch data',undefined);
         }
         else if(body.message)
         {
             callback('Unable to find Location',undefined);
         }
         else{
             console.log(body);
             callback(undefined,body.weather[0].description+ '. It is currently '+body.main.temp + ' degree out there. And humidity is '+body.main.humidity);
         }
         
     })

}

module.exports = forecast;