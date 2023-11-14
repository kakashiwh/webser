const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// setup static diurectory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'bla bla'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'chingchong'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        helptext:'blash',
        name:'zyra'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide an address in order to continue'
        })  
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{  //if ={} in {latitude,longitude,location}={} when we get error it wont be properly able to destructure undefined so to properly define it we use ={} afterwards 
        
        
        if(error){
           return res.send({error})
        }
    
        forecast( latitude, longitude , (error, forcastData) => {
            
            if(error){
            return res.send({error})
           }
            res.send({   
                location, 
                forcast: forcastData,
                address:req.query.address
            })
          
          })
        
    })

    // res.send({
    //     location:  'philedelphia',
    //     forcast: 'it is snowing',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
      return res.send({
            error:'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'help article not found',
        name:'hydra'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'PAGE NOT FOUND',
        name:'hydra'
    })
})

app.listen(3000,()=>{
    console.log('Server is up 3000')
})