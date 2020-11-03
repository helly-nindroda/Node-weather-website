const path=require('path');
const express=require('express');
const { isAbsolute } = require('path');
const hbs=require('hbs');
const { title } = require('process');

const geocode=require('./utilis/geocode');
const forecast=require('./utilis/forecast');
const { response } = require('express');

const app=express();


//define path for express config
const publicDirectoryPath= path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');
const partialsPaths=path.join(__dirname,'../templates/partials');

//set handlebars engine and view location
//app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');   //use 2 values of key and value. key must match 'view engine' and value is the package we installed that is hbs.
app.set('views',viewPath);
hbs.registerPartials(partialsPaths);


//set up static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req,res) => {
    //res.render('index.hbs');
    res.render('index',{
        title:'Weather',
        name:'Helly Nindroda'
    });  // first is file we want to view dynamically and second is object we  want to pass so now index.hbs can access title and name so lets allow what we want to print in index.hbs
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Helly Nindroda'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:"this is a help message.",
        title:'Help',
        name:'Helly Nindroda'
    });
})
//app.use(express.static(publicDirectoryPath/isAbsolute.html));

// app.get('',(req,res)=>{
//     res.send('Hello Express!');
// })     this is never going to run now

// app.get('/help',(req,res)=>{   //first parameter is partial string that is something that we want to open from home page  then it is request and response
//     res.send('Help Page');
    
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>');
// })

app.get('/weather',(req,res)=>{
    if(! req.query.address)
    {
        return res.send({
            error:'You Must provide Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=> { 
    //{latitude,longitude,location} is destructuring of data so can use data.latitude and likewise also.
    if(error)
    {
       return  res.send({error});  //return statement is necessary so it will not go in the other part of the block otherwise have to write else part 
    }
    
    //console.log(location);
    forecast(longitude, latitude, (error, data) => {
        if(error)
        {
           return res.send({error});
        }
        //or to access location here we have to give another name for data of one of them and then we can access them.
        res.send({
            forecast:data,
            location,
            address:req.query.address
        });
      })
})

    // res.send({
    //     location:req.query.address,
    //     forecast: '25 degrees'
    // });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message: 'Help document not found',
        name: 'Helly Nindroda'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message: 'Page not found',
        name: 'Helly Nindroda'
    })
})


app.listen(3000,()=>{  //3000 is port no. so on browser localhost:3000
    console.log("starting up");
})