# MetHacks2023
## Inspiration
Since we're students living at home, we don't spend too much time learning new cooking things. So when we were thinking of projects to build, something related to food enticed both of us. Using AI to help generate recipes was something that we both found to be really useful and can definitely be used in our day-to-day lives. 

## What it does
Cook-e takes in a food selection and produces a list of ingredients, nutrition facts, and a recipe. You can take this information and start cooking, or if you see that there's something that you don't like about the recipe, you can ask to cater the recipe more to your needs.
Cook-e also utilizes software observability and provides the developer with key information throughout the software cycle. Observability and distributed tracing are important concepts in modern software development because they help developers understand and debug complex distributed systems. 

## How we built it
For the recipe generator, we used Cohere's command model so that it could give us recipes for any food that we asked for. The nutritional facts were found using an API called CalorieNinjas. Our front-end and back-end uses NodeJS to tie everything together.
We introduced the leading opensource technology(Opentelemetry) within our projected as we took advantage of auto-instrumenting our code and exporting trace result with our local instance of Jaeger UI, an opensource tool which allows develops to search, view trace data and analyze performance metrics, bottlenecks within a system and the overall flow of the system. 

## Challenges we ran into
- Figuring out how to uses Cohere's model for contextual conversations.
- Tying our front-end and back-end data together.

## Accomplishments that we're proud of
We're proud of being able to use an LLM for the first time as this was our first venture into something like this. Completing a project which tied together a bunch of different technologies in such a short time is definitely no small feat, but to accomplish a working MVP which is on par with our expectations is definitely something for us to be proud of. 

## What we learned
How to process data from a Generation model, and make it viewable for the user. How to handle API requests when using multiple other API calls. How to deploy our project on a cloud-based platform. Incorporate distributed tracing within our project. 

## What's next for cook-e
We want to implement the feature of being able to provide the ingredients and seeing what the model suggests to make with those ingredients.

## How to run:
Get into root directory:
MetHacksApp
In one terminal open backend directory, run `npm install` and finally run `node chat.js`. This starts the backend service of our application
In another terminal open test-app directory, run `npm install` and run finally 'npm start'. This starts the frontend service of our application

To view Opentelemetry Trace data on Jaeger UI, ensure that you have a jaeger instance running on yoiur computer. Simply run the command mentioned below and openup http://localhost:16686/:
```
docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.45
```
