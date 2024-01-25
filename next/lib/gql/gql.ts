/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment FragmentText on Text {\n    value\n    processed\n    format\n  }\n": types.FragmentTextFragmentDoc,
    "\n  fragment FragmentTextSummary on TextSummary {\n    value\n    processed\n    format\n    summary\n  }\n": types.FragmentTextSummaryFragmentDoc,
    "\n  fragment FragmentFormattedTitle on Text {\n    value\n    processed\n    format\n  }\n": types.FragmentFormattedTitleFragmentDoc,
    "\n  fragment FragmentLink on Link {\n    __typename\n    title\n    url\n    internal\n  }\n": types.FragmentLinkFragmentDoc,
    "\n  fragment FragmentFile on File {\n    name\n    url\n    size\n    mime\n    description\n  }\n": types.FragmentFileFragmentDoc,
    "\n  fragment FragmentImage on Image {\n    url\n    width\n    height\n    alt\n    title\n    size\n    mime\n  }\n": types.FragmentImageFragmentDoc,
    "\n  fragment FragmentMetaTag on MetaTagValue {\n    __typename\n    tag\n    attributes {\n      name\n      content\n    }\n  }\n": types.FragmentMetaTagFragmentDoc,
    "\n  fragment FragmentMediaUnion on MediaUnion {\n    ...FragmentMediaAudio\n    ...FragmentMediaDocument\n    ...FragmentMediaImage\n    ...FragmentMediaRemoteVideo\n  }\n": types.FragmentMediaUnionFragmentDoc,
    "\n  fragment FragmentMediaAudio on MediaAudio {\n    id\n    name\n    mediaAudioFile {\n      ...FragmentFile\n    }\n  }\n": types.FragmentMediaAudioFragmentDoc,
    "\n  fragment FragmentMediaDocument on MediaDocument {\n    id\n    name\n    mediaDocument {\n      ...FragmentFile\n    }\n  }\n": types.FragmentMediaDocumentFragmentDoc,
    "\n  fragment FragmentMediaImage on MediaImage {\n    id\n    mediaImage {\n      ...FragmentImage\n    }\n  }\n": types.FragmentMediaImageFragmentDoc,
    "\n  fragment FragmentMediaRemoteVideo on MediaRemoteVideo {\n    id\n    name\n    mediaOembedVideo\n  }\n": types.FragmentMediaRemoteVideoFragmentDoc,
    "\n  fragment FragmentParagraphFormattedText on ParagraphFormattedText {\n    __typename\n    id\n    formattedTextText: formattedText {\n      ...FragmentText\n    }\n  }\n": types.FragmentParagraphFormattedTextFragmentDoc,
    "\n  fragment FragmentParagraphLink on ParagraphLink {\n    __typename\n    id\n    links {\n      ...FragmentLink\n    }\n  }\n": types.FragmentParagraphLinkFragmentDoc,
    "\n  fragment FragmentParagraphImage on ParagraphImage {\n    __typename\n    id\n    image {\n      ...FragmentMediaUnion\n    }\n  }\n": types.FragmentParagraphImageFragmentDoc,
    "\n  fragment FragmentParagraphVideo on ParagraphVideo {\n    __typename\n    id\n    video {\n      ...FragmentMediaUnion\n    }\n  }\n": types.FragmentParagraphVideoFragmentDoc,
    "\n  fragment FragmentParagraphHero on ParagraphHero {\n    __typename\n    id\n    formattedText {\n      ...FragmentText\n    }\n    image {\n      ...FragmentMediaUnion\n    }\n    primaryLink {\n      ...FragmentLink\n    }\n    secondaryLink {\n      ...FragmentLink\n    }\n    heading\n  }\n": types.FragmentParagraphHeroFragmentDoc,
    "\n  fragment FragmentUser on User {\n    name\n    mail\n  }\n": types.FragmentUserFragmentDoc,
    "\n  query GetNodeByPath($path: String!, $langcode: String!) {\n    route(path: $path, langcode: $langcode) {\n      __typename\n      ... on RouteInternal {\n        __typename\n        entity {\n          ... on NodeInterface {\n            __typename\n            id\n            title\n            status\n            path\n            langcode {\n              id\n            }\n            created {\n              timestamp\n            }\n            changed {\n              timestamp\n            }\n            metatag {\n              ...FragmentMetaTag\n            }\n          }\n          ... on NodeFrontpage {\n            contentElements {\n              ... on ParagraphInterface {\n                id\n                __typename\n              }\n              ...FragmentParagraphFormattedText\n              ...FragmentParagraphImage\n              ...FragmentParagraphLink\n              ...FragmentParagraphVideo\n              ...FragmentParagraphHero\n            }\n          }\n          ... on NodePage {\n            contentElements {\n              ... on ParagraphInterface {\n                id\n                __typename\n              }\n              ...FragmentParagraphFormattedText\n              ...FragmentParagraphImage\n              ...FragmentParagraphLink\n              ...FragmentParagraphVideo\n              ...FragmentParagraphHero\n            }\n          }\n          ... on NodeArticle {\n            excerpt\n            sticky\n            body {\n              ...FragmentTextSummary\n            }\n            image {\n              ...FragmentImage\n            }\n            author {\n              __typename\n              ... on User {\n                ...FragmentUser\n              }\n            }\n          }\n        }\n      }\n      ... on RouteRedirect {\n        __typename\n        status\n        url\n        internal\n      }\n    }\n  }\n": types.GetNodeByPathDocument,
    "\n  query getPagesPaths($number: Int, $langcode: String) {\n    nodePages(\n      first: $number\n      langcode: $langcode\n      sortKey: UPDATED_AT\n      reverse: true\n    ) {\n      nodes {\n        path\n      }\n    }\n    nodeArticles(\n      first: $number\n      langcode: $langcode\n      sortKey: UPDATED_AT\n      reverse: true\n    ) {\n      nodes {\n        path\n      }\n    }\n  }\n": types.GetPagesPathsDocument,
    "\n  query getNodePathByIdAndLangcode($id: ID!, $langcode: String!) {\n    node(id: $id, langcode: $langcode) {\n      ... on NodeInterface {\n        path\n        langcode {\n          id\n        }\n        status\n      }\n    }\n  }\n": types.GetNodePathByIdAndLangcodeDocument,
    "\n  query getMenu($name: MenuAvailable!, $langcode: String!) {\n    menu(name: $name, langcode: $langcode) {\n      __typename\n      items {\n        id\n        description\n        url\n        langcode\n        title\n        internal\n        children {\n          id\n          description\n          url\n          langcode\n          title\n          internal\n          children {\n            id\n            description\n            url\n            langcode\n            title\n            internal\n          }\n        }\n      }\n    }\n  }\n": types.GetMenuDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentText on Text {\n    value\n    processed\n    format\n  }\n"): (typeof documents)["\n  fragment FragmentText on Text {\n    value\n    processed\n    format\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentTextSummary on TextSummary {\n    value\n    processed\n    format\n    summary\n  }\n"): (typeof documents)["\n  fragment FragmentTextSummary on TextSummary {\n    value\n    processed\n    format\n    summary\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentFormattedTitle on Text {\n    value\n    processed\n    format\n  }\n"): (typeof documents)["\n  fragment FragmentFormattedTitle on Text {\n    value\n    processed\n    format\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentLink on Link {\n    __typename\n    title\n    url\n    internal\n  }\n"): (typeof documents)["\n  fragment FragmentLink on Link {\n    __typename\n    title\n    url\n    internal\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentFile on File {\n    name\n    url\n    size\n    mime\n    description\n  }\n"): (typeof documents)["\n  fragment FragmentFile on File {\n    name\n    url\n    size\n    mime\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentImage on Image {\n    url\n    width\n    height\n    alt\n    title\n    size\n    mime\n  }\n"): (typeof documents)["\n  fragment FragmentImage on Image {\n    url\n    width\n    height\n    alt\n    title\n    size\n    mime\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMetaTag on MetaTagValue {\n    __typename\n    tag\n    attributes {\n      name\n      content\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentMetaTag on MetaTagValue {\n    __typename\n    tag\n    attributes {\n      name\n      content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMediaUnion on MediaUnion {\n    ...FragmentMediaAudio\n    ...FragmentMediaDocument\n    ...FragmentMediaImage\n    ...FragmentMediaRemoteVideo\n  }\n"): (typeof documents)["\n  fragment FragmentMediaUnion on MediaUnion {\n    ...FragmentMediaAudio\n    ...FragmentMediaDocument\n    ...FragmentMediaImage\n    ...FragmentMediaRemoteVideo\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMediaAudio on MediaAudio {\n    id\n    name\n    mediaAudioFile {\n      ...FragmentFile\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentMediaAudio on MediaAudio {\n    id\n    name\n    mediaAudioFile {\n      ...FragmentFile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMediaDocument on MediaDocument {\n    id\n    name\n    mediaDocument {\n      ...FragmentFile\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentMediaDocument on MediaDocument {\n    id\n    name\n    mediaDocument {\n      ...FragmentFile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMediaImage on MediaImage {\n    id\n    mediaImage {\n      ...FragmentImage\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentMediaImage on MediaImage {\n    id\n    mediaImage {\n      ...FragmentImage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMediaRemoteVideo on MediaRemoteVideo {\n    id\n    name\n    mediaOembedVideo\n  }\n"): (typeof documents)["\n  fragment FragmentMediaRemoteVideo on MediaRemoteVideo {\n    id\n    name\n    mediaOembedVideo\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphFormattedText on ParagraphFormattedText {\n    __typename\n    id\n    formattedTextText: formattedText {\n      ...FragmentText\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphFormattedText on ParagraphFormattedText {\n    __typename\n    id\n    formattedTextText: formattedText {\n      ...FragmentText\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphLink on ParagraphLink {\n    __typename\n    id\n    links {\n      ...FragmentLink\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphLink on ParagraphLink {\n    __typename\n    id\n    links {\n      ...FragmentLink\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphImage on ParagraphImage {\n    __typename\n    id\n    image {\n      ...FragmentMediaUnion\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphImage on ParagraphImage {\n    __typename\n    id\n    image {\n      ...FragmentMediaUnion\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphVideo on ParagraphVideo {\n    __typename\n    id\n    video {\n      ...FragmentMediaUnion\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphVideo on ParagraphVideo {\n    __typename\n    id\n    video {\n      ...FragmentMediaUnion\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphHero on ParagraphHero {\n    __typename\n    id\n    formattedText {\n      ...FragmentText\n    }\n    image {\n      ...FragmentMediaUnion\n    }\n    primaryLink {\n      ...FragmentLink\n    }\n    secondaryLink {\n      ...FragmentLink\n    }\n    heading\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphHero on ParagraphHero {\n    __typename\n    id\n    formattedText {\n      ...FragmentText\n    }\n    image {\n      ...FragmentMediaUnion\n    }\n    primaryLink {\n      ...FragmentLink\n    }\n    secondaryLink {\n      ...FragmentLink\n    }\n    heading\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentUser on User {\n    name\n    mail\n  }\n"): (typeof documents)["\n  fragment FragmentUser on User {\n    name\n    mail\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNodeByPath($path: String!, $langcode: String!) {\n    route(path: $path, langcode: $langcode) {\n      __typename\n      ... on RouteInternal {\n        __typename\n        entity {\n          ... on NodeInterface {\n            __typename\n            id\n            title\n            status\n            path\n            langcode {\n              id\n            }\n            created {\n              timestamp\n            }\n            changed {\n              timestamp\n            }\n            metatag {\n              ...FragmentMetaTag\n            }\n          }\n          ... on NodeFrontpage {\n            contentElements {\n              ... on ParagraphInterface {\n                id\n                __typename\n              }\n              ...FragmentParagraphFormattedText\n              ...FragmentParagraphImage\n              ...FragmentParagraphLink\n              ...FragmentParagraphVideo\n              ...FragmentParagraphHero\n            }\n          }\n          ... on NodePage {\n            contentElements {\n              ... on ParagraphInterface {\n                id\n                __typename\n              }\n              ...FragmentParagraphFormattedText\n              ...FragmentParagraphImage\n              ...FragmentParagraphLink\n              ...FragmentParagraphVideo\n              ...FragmentParagraphHero\n            }\n          }\n          ... on NodeArticle {\n            excerpt\n            sticky\n            body {\n              ...FragmentTextSummary\n            }\n            image {\n              ...FragmentImage\n            }\n            author {\n              __typename\n              ... on User {\n                ...FragmentUser\n              }\n            }\n          }\n        }\n      }\n      ... on RouteRedirect {\n        __typename\n        status\n        url\n        internal\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetNodeByPath($path: String!, $langcode: String!) {\n    route(path: $path, langcode: $langcode) {\n      __typename\n      ... on RouteInternal {\n        __typename\n        entity {\n          ... on NodeInterface {\n            __typename\n            id\n            title\n            status\n            path\n            langcode {\n              id\n            }\n            created {\n              timestamp\n            }\n            changed {\n              timestamp\n            }\n            metatag {\n              ...FragmentMetaTag\n            }\n          }\n          ... on NodeFrontpage {\n            contentElements {\n              ... on ParagraphInterface {\n                id\n                __typename\n              }\n              ...FragmentParagraphFormattedText\n              ...FragmentParagraphImage\n              ...FragmentParagraphLink\n              ...FragmentParagraphVideo\n              ...FragmentParagraphHero\n            }\n          }\n          ... on NodePage {\n            contentElements {\n              ... on ParagraphInterface {\n                id\n                __typename\n              }\n              ...FragmentParagraphFormattedText\n              ...FragmentParagraphImage\n              ...FragmentParagraphLink\n              ...FragmentParagraphVideo\n              ...FragmentParagraphHero\n            }\n          }\n          ... on NodeArticle {\n            excerpt\n            sticky\n            body {\n              ...FragmentTextSummary\n            }\n            image {\n              ...FragmentImage\n            }\n            author {\n              __typename\n              ... on User {\n                ...FragmentUser\n              }\n            }\n          }\n        }\n      }\n      ... on RouteRedirect {\n        __typename\n        status\n        url\n        internal\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPagesPaths($number: Int, $langcode: String) {\n    nodePages(\n      first: $number\n      langcode: $langcode\n      sortKey: UPDATED_AT\n      reverse: true\n    ) {\n      nodes {\n        path\n      }\n    }\n    nodeArticles(\n      first: $number\n      langcode: $langcode\n      sortKey: UPDATED_AT\n      reverse: true\n    ) {\n      nodes {\n        path\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPagesPaths($number: Int, $langcode: String) {\n    nodePages(\n      first: $number\n      langcode: $langcode\n      sortKey: UPDATED_AT\n      reverse: true\n    ) {\n      nodes {\n        path\n      }\n    }\n    nodeArticles(\n      first: $number\n      langcode: $langcode\n      sortKey: UPDATED_AT\n      reverse: true\n    ) {\n      nodes {\n        path\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getNodePathByIdAndLangcode($id: ID!, $langcode: String!) {\n    node(id: $id, langcode: $langcode) {\n      ... on NodeInterface {\n        path\n        langcode {\n          id\n        }\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query getNodePathByIdAndLangcode($id: ID!, $langcode: String!) {\n    node(id: $id, langcode: $langcode) {\n      ... on NodeInterface {\n        path\n        langcode {\n          id\n        }\n        status\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMenu($name: MenuAvailable!, $langcode: String!) {\n    menu(name: $name, langcode: $langcode) {\n      __typename\n      items {\n        id\n        description\n        url\n        langcode\n        title\n        internal\n        children {\n          id\n          description\n          url\n          langcode\n          title\n          internal\n          children {\n            id\n            description\n            url\n            langcode\n            title\n            internal\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMenu($name: MenuAvailable!, $langcode: String!) {\n    menu(name: $name, langcode: $langcode) {\n      __typename\n      items {\n        id\n        description\n        url\n        langcode\n        title\n        internal\n        children {\n          id\n          description\n          url\n          langcode\n          title\n          internal\n          children {\n            id\n            description\n            url\n            langcode\n            title\n            internal\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;