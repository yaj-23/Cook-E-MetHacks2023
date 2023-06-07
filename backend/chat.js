require('./app.js');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const nutrition = require("./nutrition");

require("dotenv").config();
const apiKey = process.env.COHERE_API_KEY;

const cohere = require("cohere-ai");
cohere.init(apiKey);

if (fs.existsSync('history.txt')) {
  fs.unlinkSync("history.txt");
}
fs.createWriteStream("history.txt");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let i = 0;

function isFileEmpty(fileName, ignoreWhitespace = true) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve((!ignoreWhitespace && data.length == 0) || (ignoreWhitespace && !!String(data).match(/^\s*$/)))
    });
  })
}

app.delete("/history", (req, res) => {
  fs.writeFile('./history.txt', '', function () {
    console.log('done');
  });
  res.status(200).send("History deleted successfully!");
});

app.post("/chat", async (req, res) => {
  const prompt = req.body["prompt"];
  const message = fs.readFileSync("history.txt");
  console.log(prompt);
  let calories;
  let food;
  try {
    const isEmpty = await isFileEmpty('history.txt');
    console.log("empty:", isEmpty);
  } catch (err) {
    i = 0;
  }
  if (i < 1) {
    input = "Give me the ingredients list for " + prompt + " with few ingredients. Add measurements for each ingredient. Clearly label the ingredients and recipe.";
    food = prompt;
  } else {
    input = message + "\n" + prompt;
    food = prompt;
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

  try {
    calories = await nutrition.getCalories(food);
    console.log(calories);
    res.send({ recipe, calories });
  } catch (err) {
    console.error(err);
    res.send({ recipe, calories });
  }

  console.log("<=====================RECIPE==================>");
  console.log(recipe);
  i++;
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
