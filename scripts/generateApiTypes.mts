import 'dotenv/config';
import fs from 'node:fs';
import openapiTS, { astToString } from 'openapi-typescript';
import ts from 'typescript';

const serverProtocol = process.env.SERVER_PROTOCOL;
const serverIP = process.env.SERVER_IP;
const serverPort = process.env.SERVER_PORT;

if (!(serverProtocol && serverIP && serverPort)) {
  throw new Error('Setup server in .env file');
}

const schemaURL = `${serverProtocol}://${serverIP}:${serverPort}/openapi.json`;

// Создаём типы для бинарных файлов
const FILE = ts.factory.createTypeReferenceNode(
  ts.factory.createIdentifier('File'),
);
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull());

const ast = await openapiTS(new URL(schemaURL), {
  // Если поле в схеме называется File и имеет бинарный тип, заменяем его тип с строки на файл
  transform(schemaObject) {
    console.log(schemaObject);
    if (
      schemaObject.title === 'File' &&
      schemaObject.type === 'string' &&
      schemaObject.format === 'binary'
    ) {
      return schemaObject.nullable
        ? ts.factory.createUnionTypeNode([FILE, NULL])
        : FILE;
    }
  },
});
// Отключаем еслинт в сгенерированном файле
const disableESLint = '/* eslint-disable -- GENERATED FILE, DO NOT EDIT */\n';
const contents = disableESLint + astToString(ast);

fs.writeFileSync('./src/api/generated/schema.ts', contents);
