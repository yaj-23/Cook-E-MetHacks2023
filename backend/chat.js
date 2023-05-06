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

// apps.post()
app.post("/chat", async (req, res) => {
    const prompt = req.body['prompt'];
    console.log(prompt);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "system", 
            content: "You are a masterchef and know all about cooking up a wonderful home meal.",
            role: "user",
            content: prompt
        }],
        temperature: 0.25,
        max_tokens: 256,
    });
    //console.log(completion.data.choices[0].message);
    console.log("<=====================RECIPE==================>");
    const recipe = (completion.data.choices[0].message.content);
    console.log(recipe);
    res.send(recipe);
      

})

const port = 8080;
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})