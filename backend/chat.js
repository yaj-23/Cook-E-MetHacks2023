const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const nutrition = require("./nutrition");

require("dotenv").config();
const apiKey = process.env.COHERE_API_KEY;

// const openai = new OpenAIApi(config);
const cohere = require("cohere-ai");
cohere.init(apiKey);

if (fs.existsSync('history.txt')) {
  fs.unlinkSync("history.txt");
}
fs.createWriteStream("history.txt");

//setup Server
const app = new express();
app.use(bodyParser.json());
app.use(cors());

let i = 0;

// apps.post()
app.post("/chat", async (req, res) => {
  const prompt = req.body["prompt"];
  const message = fs.readFileSync("history.txt");
  console.log(prompt);
  let calories;
  let food;
  if (i < 1) {
    input = "Give me the ingredients list for " + prompt + " with few ingredients. Add measurements for each ingredient. Clearly label the ingredients and recipe.";
    food = prompt;
  } else {
    input = message + "\n" + prompt;
  }
  const response = await cohere.generate({
    model: "command",
    prompt: input,
    max_tokens: 500,
    temperature: 0.2,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });

  const recipe = response.body.generations[0].text;
  fs.appendFile('history.txt', recipe, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });


  nutrition.getCalories(food)
    .then((result) => {
      calories = result;
      console.log(calories);
      res.send({ recipe, calories });
    })
    .catch((err) => {
      console.error(err);
      res.send({ recipe, calories });
    });
  

  console.log("<=====================RECIPE==================>");
  console.log(recipe)
  i++;
});


const port = 4001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
