import 'dotenv/config';
import fs from 'node:fs';
import { merge, isErrorResult, MergeInput } from 'openapi-merge';
import openapiTS, { astToString } from 'openapi-typescript';

type SchemeMergeInput = MergeInput[number]['oas'];

const fetchByUrl = async (
  url: string,
): Promise<SchemeMergeInput | undefined> => {
  try {
    return (await fetch(url).then((response) =>
      response.json(),
    )) as SchemeMergeInput;
  } catch {
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
if (serverSchema) {
  mergeTargets.push({
    oas: serverSchema,
    pathModification: {
      prepend: '/api',
    },
  });
}

const cmsSchema = await fetchByUrl(cmsSchemaURL);
if (cmsSchema) {
  mergeTargets.push({
    oas: cmsSchema,
    pathModification: {
      prepend: '/cms',
    },
  });
}

// Создаём типы для бинарных файлов
// const FILE = ts.factory.createTypeReferenceNode(
//   ts.factory.createIdentifier('File'),
// );
// const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull());

// const algorithms = new Set<string>();

// const ast = await openapiTS(new URL(schemaURL), {
//   // Если поле в схеме называется File и имеет бинарный тип, заменяем его тип с строки на файл
//   transform(schemaObject) {
//     if (
//       schemaObject.title === 'File' &&
//       schemaObject.type === 'string' &&
//       schemaObject.format === 'binary'
//     ) {
//       return schemaObject.nullable
//         ? ts.factory.createUnionTypeNode([FILE, NULL])
//         : FILE;
//     }

//     if (
//       schemaObject.type === 'object' &&
//       schemaObject.properties &&
//       'algo_name' in schemaObject.properties &&
//       'enum' in schemaObject.properties.algo_name &&
//       schemaObject.properties.algo_name.enum &&
//       '0' in schemaObject.properties.algo_name.enum &&
//       typeof schemaObject.properties.algo_name.enum[0] === 'string'
//     ) {
//       algorithms.add(schemaObject.properties.algo_name.enum[0]);
//     }
//   },
//   exportType: true,
//   enum: true,
//   rootTypes: true,
// });

// const algorithmsList = Array.from(algorithms.values()).sort();
// ast.push(
//   ts.factory.createTypeAliasDeclaration(
//     [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
//     ts.factory.createIdentifier('Algorithms'),
//     undefined,
//     ts.factory.createUnionTypeNode(
//       algorithmsList.map((algo) =>
//         ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(algo)),
//       ),
//     ),
//   ),
//   ts.factory.createVariableStatement(
//     [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
//     ts.factory.createVariableDeclarationList(
//       [
//         ts.factory.createVariableDeclaration(
//           ts.factory.createIdentifier('AlgorithmList'),
//           undefined,
//           ts.factory.createTypeReferenceNode(
//             ts.factory.createIdentifier('Array'),
//             [
//               ts.factory.createTypeReferenceNode(
//                 ts.factory.createIdentifier('Algorithms'),
//                 undefined,
//               ),
//             ],
//           ),
//           ts.factory.createArrayLiteralExpression(
//             algorithmsList.map((algo) => ts.factory.createStringLiteral(algo)),
//             false,
//           ),
//         ),
//       ],
//       ts.NodeFlags.Const,
//     ),
//   ),
// );

const mergeResult = merge(mergeTargets);

if (isErrorResult(mergeResult)) {
  throw new Error(mergeResult.message);
}

const ast = await openapiTS(JSON.stringify(mergeResult.output), {
  exportType: true,
  enum: true,
  rootTypes: true,
});

// Отключаем еслинт в сгенерированном файле
const disableESLint = '/* eslint-disable -- GENERATED FILE, DO NOT EDIT */\n';
const contents = disableESLint + astToString(ast);

fs.writeFileSync('./src/api/generated/schema.ts', contents);
