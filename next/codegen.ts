import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";
import fs from "fs";
import os from "os";
import path from "path";

const tokenFilePath = path.resolve(os.tmpdir(), ".drupal-access-token.txt");
const token = fs.readFileSync(tokenFilePath, "utf8").trim();

loadEnvConfig(process.cwd());

/* eslint-disable-next-line n/no-process-env */
const schemaUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/graphql`;

const config: CodegenConfig = {
  schema: [
    {
      [schemaUrl]: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    },
  ],
  documents: ["lib/graphql/**/*.ts", "!./node_modules/**/*", "!./.next/**/*"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./lib/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
    "./lib/graphql/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
  verbose: true,
};

export default config;
