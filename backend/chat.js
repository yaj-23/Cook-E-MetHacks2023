const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require('dotenv').config()
const apiKey = process.env.API_KEY;

const {Configuration, OpenAIApi} = require("openai");

const config = new Configuration({
    apiKey: apiKey,

})

const openai = new OpenAIApi(config);

//setup Server
const app  = new express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    //const prompt = req.body;
    const prompt = req.body['prompt'];

    console.log(prompt);

    const completion = await openai.createCompletion({
       // prompt: "add applebites and make it crispy",
       prompt: prompt,
        model: "text-davinci-002",
        temperature: 0.4,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });
    console.log("", prompt);
    console.log(completion.data.choices[0].text);
    res.send(completion.data.choices[0].text);
})

const port = 8080;
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})