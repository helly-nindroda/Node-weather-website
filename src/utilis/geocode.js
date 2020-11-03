const request=require('request');


const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address)+ ".json?access_token=pk.eyJ1IjoiaGVsbHkyNDEwIiwiYSI6ImNrZ3hhbmxneDBpZHMyeHFoaW04MXkwZTEifQ.F2iU-5ac_Wp9f5U-lUfWow&limit=1";
    request({url,json:true},(error,{body})=>{  //{body} is destructured form of response. can ue it like response.body and url:url is also valis but converted to shorthand syntax
        if(error)
        {
            callback('Could not fetch the data',undefined);
        }
        else if(body.features.length===0)
        {
            callback('Could not find the location',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
            
        }
        
    })
}

module.exports=geocode;