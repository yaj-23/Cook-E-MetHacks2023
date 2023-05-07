require("dotenv").config();
const apiKey = process.env.NUTRITION_API_KEY;

const request = require('request');
// var query = 'apple';
function getCalories(msg) {
    request.get({
        url: 'https://api.calorieninjas.com/v1/nutrition?query=' + msg,
        headers: {
            'X-Api-Key': apiKey
        },
    }, function (error, response, body) {
        if (error) return console.error('Request failed:', error);
        else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        else {
            const obj = JSON.parse(body);
            console.log(obj.items[0].calories + " calories/100g")
        }
    });
}

module.exports = { getCalories };