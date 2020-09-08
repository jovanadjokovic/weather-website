const path = require('path')
const express = require('express')
const hbs = require('hbs')
 
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))




app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jovanica Pametnica'
    })

})

app.get('/about',(req,res) => {
    res.render('about', {
        title:'About me',
        name: 'Jocka'
    })

})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        message:'This is help page',
        name: 'Jokica Sljokica'
    })

})

app.get('/weather',(req,res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'Provide an adress'
        })
    }


    geocode(req.query.adress, (error, {latitude, longitude, location}={}) => {
        if (error) {
    return res.send({error})
        }
        
    
        weather( latitude, longitude, (error, result) => {
            if (error) {
                return res.send({error})
            }
            
            res.send({
                place:location,
                forecast:result
            })
        })
        
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title:'404',
        errorMessage: 'Help article not found',
        name: 'Joka Sljoka'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Joca Skljoca'
    })

})


app.listen(3000,() => {
    console.log('Server is up on port 3000')
})