import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // eslint-disable-next-line n/no-process-env
  schema: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/graphql`,
  documents: ["lib/graphql/**/*.ts", "!./node_modules/**/*", "!./.next/**/*"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./lib/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
  verbose: true,
};

export default config;
