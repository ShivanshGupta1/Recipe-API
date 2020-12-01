const express = require('express');
const request = require('request');
const app = express();
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { recipe: null, error: null })

});
app.listen(3000, () => {
    console.log("server is running")
})

app.post('/', (req, res) => {
    let query = req.body.query
    let apikey = '6d99d94cf9e4a256c4a5cba6500e7e73'
    let apiid = '5f950a8f'
    let url = `api.edamam.com/search?q=${query}&app_id=${apiid}&app_key=${apikey}`
    request(url, function (error, response, body) {
        if (error) {
            res.render('index', { recipe: null, error: 'Error Please try again' })
        }
        else {
            weather_json = JSON.parse(body);
            let weather = {
                city: city,
                temperature: Math.round(weather_json.main.temp),
                description: weather_json.weather[0].description,
                icon: weather_json.weather[0].icon
            }



            res.render('index', { weather: weather, error: null })
        }
    });

})








// Degrees to Fahrenheit
