/*app.js*/
const { Resource } = require('@opentelemetry/resources');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { GraphQLInstrumentation } = require('@opentelemetry/instrumentation-graphql');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');


const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");

const sdk = new opentelemetry.NodeSDK({
  serviceName: "backend",
  traceExporter: new OTLPTraceExporter({url: "http://localhost:4318/v1/traces", headers: {}}),
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk
  .start()