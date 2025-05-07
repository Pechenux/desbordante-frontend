import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { merge, isErrorResult, MergeInput } from 'openapi-merge';
import openapiTS, { astToString } from 'openapi-typescript';
import ts from 'typescript';

type SchemeMergeInput = MergeInput[number]['oas'];

const fetchByUrl = async (
  url: string,
): Promise<SchemeMergeInput | undefined> => {
  try {
    return (await fetch(url).then((response) =>
      response.json(),
    )) as SchemeMergeInput;
  } catch {
    console.log(`Failed to fetch ${url}`);
    return undefined;
  }
};

const serverProtocol = process.env.SERVER_PROTOCOL;
const serverIP = process.env.SERVER_IP;
const serverPort = process.env.SERVER_PORT;

if (!(serverProtocol && serverIP && serverPort)) {
  throw new Error('Setup server in .env file');
}

const serverSchemaURL = `${serverProtocol}://${serverIP}:${serverPort}/openapi.json`;

const cmsProtocol = process.env.CMS_PROTOCOL;
const cmsIP = process.env.CMS_IP;
const cmsPort = process.env.CMS_PORT;
const cmsVersion = process.env.CMS_VERSION ?? 'v1.0.0';

if (!(cmsProtocol && cmsIP && cmsPort)) {
  throw new Error('Setup cms in .env file');
}

const cmsSchemaURL = `${cmsProtocol}://${cmsIP}:${cmsPort}/documentation/${cmsVersion}/openapi.json`;

const mergeTargets: MergeInput = [];

const serverSchema = await fetchByUrl(serverSchemaURL);
if (serverSchema && !('error' in serverSchema)) {
  mergeTargets.push({
    oas: serverSchema,
    pathModification: {
      prepend: '/api',
    },
  });
} else {
  console.error(`Failed to fetch ${serverSchemaURL}`);
}

const cmsSchema = await fetchByUrl(cmsSchemaURL);
if (cmsSchema && !('error' in cmsSchema)) {
  mergeTargets.push({
    oas: cmsSchema,
    pathModification: {
      prepend: '/cms',
    },
  });
} else {
  console.error(`Failed to fetch ${cmsSchemaURL}`);
}

// Создаём типы для бинарных файлов
const FILE = ts.factory.createTypeReferenceNode(
  ts.factory.createIdentifier('File'),
);
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull());

const mergeResult = merge(mergeTargets);

if (isErrorResult(mergeResult)) {
  throw new Error(mergeResult.message);
}

const ast = await openapiTS(JSON.stringify(mergeResult.output), {
  transform(schemaObject) {
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
  exportType: true,
  enum: true,
  rootTypes: true,
});

// Отключаем еслинт в сгенерированном файле
const disableESLint = '/* eslint-disable -- GENERATED FILE, DO NOT EDIT */\n';
const contents = disableESLint + astToString(ast);

fs.writeFileSync(path.resolve('./src/api/generated/schema.ts'), contents);
