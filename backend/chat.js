const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const apiKey = process.env.API_KEY;

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: apiKey,
});

// const openai = new OpenAIApi(config);
const cohere = require("cohere-ai");
cohere.init("EzBiLc0Koknce3Rm5Ln7RVn8XPu7kaxMkpG7bQZl");

//setup Server
const app = new express();
app.use(bodyParser.json());
app.use(cors());

// apps.post()
app.post("/chat", async (req, res) => {
  const prompt = req.body["prompt"];
  console.log(prompt);

  const response = await cohere.generate({
    model: "command",
    prompt: prompt,
    max_tokens: 100,
    temperature: 0.2,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });
  const recipe = response.body.generations[0].text;
  console.log("<=====================RECIPE==================>");

  console.log(recipe);
  res.send(recipe);
});

const port = 4001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
