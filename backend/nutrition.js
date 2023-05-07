require("dotenv").config();
const apiKey = process.env.NUTRITION_API_KEY;

const request = require('request');
// var query = 'apple';
function getCalories(msg) {
    return new Promise((resolve, reject) => {
        request.get(
            {
                url: "https://api.calorieninjas.com/v1/nutrition?query=" + msg,
                headers: {
                    "X-Api-Key": apiKey,
                },
            },
            function (error, response, body) {
                if (error) reject(error);
                else if (response.statusCode != 200)
                    reject(
                        new Error(response.statusCode + ": " + body.toString("utf8"))
                    );
                else {
                    const obj = JSON.parse(body);
                    resolve(obj.items[0]);
                }
            }
        );
    });
}

module.exports = { getCalories };