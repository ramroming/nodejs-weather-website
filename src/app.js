const path = require('path') //better to keep core node modules at top
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { isContext } = require('vm')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000 //for heroku or locally then 3000 is going to be used as a port

//definde paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// it takes two parameters the first is the partial url to the route 
// and takes a function that describes what the server should do when someone tries to get the resource at a specific url
// this function gets called by two arguements 1- object 2-response
// app.get('' , (req, res)=>{
//     res.send('<h1>Weather</h1>') //send something back to the requester 
// }) 

//set up handle bars engine and views location
app.set('view engine', 'hbs') //all we need to get handle bars to set up
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index',
        {
            title: 'Weather',
            name: 'Reem Alhalbouni'
        })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Reem Alhalbouni'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'help is on the way!',
        name: 'Reem Alhalbouni'
    })
})

app.get('/weather', (req, res) => {

    // if no address was sent
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    // if an address was sent
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData.forecastDesc,
                location,
                address: req.query.address,
                iconUrl: forecastData.iconUrl
            })

        })
    })

})


app.get('/product', (req, res) => {

    if (!req.query.search) {
        return res.send({ //stop the function so the code down below not run because you can't send two responses back
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found!',
        title: '404',
        name: 'Reem Alhalbouni'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Reem Alhalbouni'
    })
})


app.listen(port, () => { //callback that runs when the serve is running
    console.log('Server is up on port ' + port)

})


