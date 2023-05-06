const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

require("dotenv").config();
const apiKey = process.env.API_KEY;

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: apiKey,
});

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
  if (i < 1) {
    input = prompt;
  } else {
    input = message + "\n" + prompt;
  }
  const response = await cohere.generate({
    model: "command",
    prompt: input,
    max_tokens: 250,
    temperature: 0.2,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });
  i++;
  const recipe = response.body.generations[0].text;
  fs.appendFile('history.txt', recipe, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  console.log("<=====================RECIPE==================>");

  console.log(recipe);
  res.send(recipe);
});

const port = 4001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
