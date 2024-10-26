import 'dotenv/config';
import fs from 'node:fs';
import openapiTS, { astToString } from 'openapi-typescript';

const serverProtocol = process.env.SERVER_PROTOCOL;
const serverIP = process.env.SERVER_IP;
const serverPort = process.env.SERVER_PORT;

if (!(serverProtocol && serverIP && serverPort)) {
  throw new Error('Setup server in .env file');
}

const schemaURL = `${serverProtocol}://${serverIP}:${serverPort}/openapi.json`;

const ast = await openapiTS(new URL(schemaURL));
const disableESLint = '/* eslint-disable -- GENERATED FILE, DO NOT EDIT */\n';
const contents = disableESLint + astToString(ast);

fs.writeFileSync('./src/api/generated/schema.ts', contents);
