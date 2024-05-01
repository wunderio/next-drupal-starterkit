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
    "\n  fragment FragmentNodeTranslation on Translation {\n    __typename\n    path\n    langcode {\n      id\n    }\n  }\n": types.FragmentNodeTranslationFragmentDoc,
    "\n  # This fragment needs to reference ALL the other defined media fragments in this file.\n  # This fragment can be used in queries where a media entity type field is present.\n  # Graphql-codegen will then generate a type with all possible variations of media\n  # that we need to typecast media in the frontend.\n  fragment FragmentMediaUnion on MediaInterface {\n    __typename\n    id\n    ...FragmentMediaAudio\n    ...FragmentMediaDocument\n    ...FragmentMediaImage\n    ...FragmentMediaRemoteVideo\n    ...FragmentMediaVideo\n  }\n": types.FragmentMediaUnionFragmentDoc,
    "\n  fragment FragmentMediaAudio on MediaAudio {\n    name\n    mediaAudioFile {\n      ...FragmentFile\n    }\n  }\n": types.FragmentMediaAudioFragmentDoc,
    "\n  fragment FragmentMediaVideo on MediaVideo {\n    name\n    mediaVideoFile {\n      ...FragmentFile\n    }\n  }\n": types.FragmentMediaVideoFragmentDoc,
    "\n  fragment FragmentMediaDocument on MediaDocument {\n    name\n    mediaDocumentFile: mediaDocument {\n      ...FragmentFile\n    }\n  }\n": types.FragmentMediaDocumentFragmentDoc,
    "\n  fragment FragmentMediaImage on MediaImage {\n    name\n    mediaImage {\n      ...FragmentImage\n    }\n  }\n": types.FragmentMediaImageFragmentDoc,
    "\n  fragment FragmentMediaRemoteVideo on MediaRemoteVideo {\n    name\n    mediaOembedVideo\n  }\n": types.FragmentMediaRemoteVideoFragmentDoc,
    "\n  fragment FragmentNodeUnion on NodeInterface {\n    __typename\n    id\n    title\n    status\n    path\n    langcode {\n      id\n    }\n    created {\n      timestamp\n    }\n    changed {\n      timestamp\n    }\n    metatag {\n      ...FragmentMetaTag\n    }\n    ...FragmentNodeArticle\n    ...FragmentNodeFrontpage\n    ...FragmentNodePage\n    ...FragmentNodeTestcontent\n  }\n": types.FragmentNodeUnionFragmentDoc,
    "\n  fragment FragmentNodeArticle on NodeArticle {\n    excerpt\n    sticky\n    body {\n      ...FragmentTextSummary\n    }\n    image {\n      ...FragmentImage\n    }\n    author {\n      __typename\n      ... on User {\n        ...FragmentUser\n      }\n    }\n    translations {\n      ...FragmentNodeTranslation\n    }\n  }\n": types.FragmentNodeArticleFragmentDoc,
    "\n  fragment FragmentNodeFrontpage on NodeFrontpage {\n    contentElements {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # Here we include only the paragraph types that can actually be used in the field\n        # contentElements for this node type. Using the generated union type, we can be sure\n        # that all fragments we use here can actually be used.\n        ... on NodeFrontpageContentElementsUnion {\n          ...FragmentParagraphFormattedText\n          ...FragmentParagraphLink\n          ...FragmentParagraphImage\n          ...FragmentParagraphVideo\n          ...FragmentParagraphFileAttachments\n          ...FragmentParagraphHero\n          ...FragmentParagraphAccordion\n          ...FragmentParagraphListingArticle\n        }\n      }\n    }\n    translations {\n      ...FragmentNodeTranslation\n    }\n  }\n": types.FragmentNodeFrontpageFragmentDoc,
    "\n  fragment FragmentNodePage on NodePage {\n    contentElements {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # Here we include only the paragraph types that can actually be used in the field\n        # contentElements for this node type. Using the generated union type, we can be sure\n        # that all fragments we refer to here can actually be used.\n        ... on NodePageContentElementsUnion {\n          ...FragmentParagraphFormattedText\n          ...FragmentParagraphLink\n          ...FragmentParagraphImage\n          ...FragmentParagraphVideo\n          ...FragmentParagraphFileAttachments\n          ...FragmentParagraphHero\n          ...FragmentParagraphAccordion\n          ...FragmentParagraphListingArticle\n          ...FragmentParagraphAccordion\n        }\n      }\n    }\n    translations {\n      ...FragmentNodeTranslation\n    }\n  }\n": types.FragmentNodePageFragmentDoc,
    "\n  fragment FragmentNodeTestcontent on NodeTestContent {\n    body {\n      ...FragmentTextSummary\n    }\n    testfield\n  }\n": types.FragmentNodeTestcontentFragmentDoc,
    "\n  fragment FragmentArticleTeaser on NodeArticle {\n    __typename\n    id\n    image {\n      ...FragmentImage\n    }\n    path\n    title\n    sticky\n    excerpt\n    created {\n      timestamp\n    }\n    author {\n      __typename\n      ... on User {\n        ...FragmentUser\n      }\n    }\n  }\n": types.FragmentArticleTeaserFragmentDoc,
    "\n  # This fragment needs to reference ALL the other defined paragraph fragments in this file.\n  # Graphql-codegen will then generate a type with all possible variations of paragraphs\n  # that we need to typecast paragraphs in the frontend.\n  # You should not use this fragment in queries, but instead add the specific fragments for\n  # the paragraph types that are supported by each paragraph field.\n  fragment FragmentParagraphUnion on ParagraphInterface {\n    __typename\n    id\n    ...FragmentParagraphFormattedText\n    ...FragmentParagraphLink\n    ...FragmentParagraphImage\n    ...FragmentParagraphVideo\n    ...FragmentParagraphFileAttachments\n    ...FragmentParagraphHero\n    ...FragmentParagraphAccordion\n    ...FragmentParagraphAccordionItem\n    ...FragmentParagraphListingArticle\n  }\n": types.FragmentParagraphUnionFragmentDoc,
    "\n  fragment FragmentParagraphFormattedText on ParagraphFormattedText {\n    # These fields are aliased here because they conflict with other instances\n    # of the same field in other paragraph types where they have different\n    # mandatory settings.\n    formattedTextHeading: heading\n    formattedTextText: formattedText {\n      ...FragmentText\n    }\n  }\n": types.FragmentParagraphFormattedTextFragmentDoc,
    "\n  fragment FragmentParagraphLink on ParagraphLink {\n    links {\n      ...FragmentLink\n    }\n  }\n": types.FragmentParagraphLinkFragmentDoc,
    "\n  fragment FragmentParagraphImage on ParagraphImage {\n    image {\n      ...FragmentMediaUnion\n    }\n  }\n": types.FragmentParagraphImageFragmentDoc,
    "\n  fragment FragmentParagraphVideo on ParagraphVideo {\n    video {\n      ...FragmentMediaUnion\n    }\n  }\n": types.FragmentParagraphVideoFragmentDoc,
    "\n  fragment FragmentParagraphFileAttachments on ParagraphFileAttachment {\n    fileAttachmentsParagraphHeading: heading\n    fileAttachmentsParagraphFormattedText: formattedText {\n      ...FragmentText\n    }\n    fileAttachments {\n      ...FragmentMediaUnion\n    }\n  }\n": types.FragmentParagraphFileAttachmentsFragmentDoc,
    "\n  fragment FragmentParagraphHero on ParagraphHero {\n    formattedText {\n      ...FragmentText\n    }\n    image {\n      ...FragmentMediaUnion\n    }\n    primaryLink {\n      ...FragmentLink\n    }\n    secondaryLink {\n      ...FragmentLink\n    }\n    paragraphHeroHeading: heading\n  }\n": types.FragmentParagraphHeroFragmentDoc,
    "\n  fragment FragmentParagraphAccordion on ParagraphAccordion {\n    heading\n    accordionLayout\n    primaryLink {\n      ...FragmentLink\n    }\n    accordionFormattedText: formattedText {\n      ...FragmentText\n    }\n    accordionItems {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # We include here only the paragraph types that can actually\n        # be used as accordion items.\n        ...FragmentParagraphAccordionItem\n      }\n    }\n  }\n": types.FragmentParagraphAccordionFragmentDoc,
    "\n  fragment FragmentParagraphAccordionItem on ParagraphAccordionItem {\n    __typename\n    id\n    accordionItemHeading: heading\n    accordionItemFormattedText: formattedText {\n      ...FragmentText\n    }\n    contentElements {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # Here we include only the paragraph types that can actually be used in the field\n        # contentElements for this paragraph type. Using the generated union type, we can be sure\n        # that all fragments we refer to here can actually be used.\n        ... on ParagraphAccordionItemContentElementsUnion {\n          ...FragmentParagraphFormattedText\n          ...FragmentParagraphImage\n          ...FragmentParagraphLink\n          ...FragmentParagraphFileAttachments\n          ...FragmentParagraphVideo\n        }\n      }\n    }\n  }\n": types.FragmentParagraphAccordionItemFragmentDoc,
    "\n  fragment FragmentParagraphListingArticle on ParagraphListingArticle {\n    __typename\n    id\n    paragraphListingArticleHeading: heading\n    limit\n  }\n": types.FragmentParagraphListingArticleFragmentDoc,
    "\n  fragment FragmentUser on User {\n    name\n    mail\n  }\n": types.FragmentUserFragmentDoc,
    "\n  query GetNodeByPath($path: String!, $langcode: String!) {\n    route(path: $path, langcode: $langcode) {\n      __typename\n      ... on RouteInternal {\n        __typename\n        entity {\n          ...FragmentNodeUnion\n        }\n      }\n      ... on RouteRedirect {\n        __typename\n        status\n        url\n        internal\n      }\n    }\n  }\n": types.GetNodeByPathDocument,
    "\n  query getPagesPaths($number: Int, $langcode: String) {\n    nodePages(\n      first: $number\n      langcode: $langcode\n      sortKey: UPDATED_AT\n      reverse: true\n    ) {\n      nodes {\n        path\n      }\n    }\n    nodeArticles(\n      first: $number\n      langcode: $langcode\n      sortKey: UPDATED_AT\n      reverse: true\n    ) {\n      nodes {\n        path\n      }\n    }\n  }\n": types.GetPagesPathsDocument,
    "\n  query getNodePathByIdAndLangcode($id: ID!, $langcode: String!) {\n    node(id: $id, langcode: $langcode) {\n      ... on NodeInterface {\n        path\n        langcode {\n          id\n        }\n        status\n      }\n    }\n  }\n": types.GetNodePathByIdAndLangcodeDocument,
    "\n  query getMenu($name: MenuAvailable!, $langcode: String!) {\n    menu(name: $name, langcode: $langcode) {\n      __typename\n      items {\n        id\n        description\n        url\n        title\n        internal\n        attributes {\n          class\n          icon\n        }\n        langcode {\n          id\n        }\n        children {\n          id\n          description\n          url\n          title\n          internal\n          attributes {\n            class\n            icon\n          }\n          langcode {\n            id\n          }\n          children {\n            id\n            description\n            url\n            title\n            internal\n            attributes {\n              class\n              icon\n            }\n            langcode {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetMenuDocument,
    "\n  query ArticleListing(\n    $langcode: String = \"en\"\n    $sticky: Boolean\n    $offset: Int = 0\n    $pageSize: Int = 10\n    $page: Int = 0\n  ) {\n    articlesView(\n      page: $page\n      pageSize: $pageSize\n      filter: { langcode: $langcode, sticky: $sticky }\n      offset: $offset\n    ) {\n      results {\n        __typename\n        ...FragmentArticleTeaser\n      }\n      pageInfo {\n        offset\n        page\n        pageSize\n        total\n      }\n    }\n  }\n": types.ArticleListingDocument,
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
export function graphql(source: "\n  fragment FragmentNodeTranslation on Translation {\n    __typename\n    path\n    langcode {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentNodeTranslation on Translation {\n    __typename\n    path\n    langcode {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  # This fragment needs to reference ALL the other defined media fragments in this file.\n  # This fragment can be used in queries where a media entity type field is present.\n  # Graphql-codegen will then generate a type with all possible variations of media\n  # that we need to typecast media in the frontend.\n  fragment FragmentMediaUnion on MediaInterface {\n    __typename\n    id\n    ...FragmentMediaAudio\n    ...FragmentMediaDocument\n    ...FragmentMediaImage\n    ...FragmentMediaRemoteVideo\n    ...FragmentMediaVideo\n  }\n"): (typeof documents)["\n  # This fragment needs to reference ALL the other defined media fragments in this file.\n  # This fragment can be used in queries where a media entity type field is present.\n  # Graphql-codegen will then generate a type with all possible variations of media\n  # that we need to typecast media in the frontend.\n  fragment FragmentMediaUnion on MediaInterface {\n    __typename\n    id\n    ...FragmentMediaAudio\n    ...FragmentMediaDocument\n    ...FragmentMediaImage\n    ...FragmentMediaRemoteVideo\n    ...FragmentMediaVideo\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMediaAudio on MediaAudio {\n    name\n    mediaAudioFile {\n      ...FragmentFile\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentMediaAudio on MediaAudio {\n    name\n    mediaAudioFile {\n      ...FragmentFile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMediaVideo on MediaVideo {\n    name\n    mediaVideoFile {\n      ...FragmentFile\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentMediaVideo on MediaVideo {\n    name\n    mediaVideoFile {\n      ...FragmentFile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMediaDocument on MediaDocument {\n    name\n    mediaDocumentFile: mediaDocument {\n      ...FragmentFile\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentMediaDocument on MediaDocument {\n    name\n    mediaDocumentFile: mediaDocument {\n      ...FragmentFile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMediaImage on MediaImage {\n    name\n    mediaImage {\n      ...FragmentImage\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentMediaImage on MediaImage {\n    name\n    mediaImage {\n      ...FragmentImage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentMediaRemoteVideo on MediaRemoteVideo {\n    name\n    mediaOembedVideo\n  }\n"): (typeof documents)["\n  fragment FragmentMediaRemoteVideo on MediaRemoteVideo {\n    name\n    mediaOembedVideo\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentNodeUnion on NodeInterface {\n    __typename\n    id\n    title\n    status\n    path\n    langcode {\n      id\n    }\n    created {\n      timestamp\n    }\n    changed {\n      timestamp\n    }\n    metatag {\n      ...FragmentMetaTag\n    }\n    ...FragmentNodeArticle\n    ...FragmentNodeFrontpage\n    ...FragmentNodePage\n    ...FragmentNodeTestcontent\n  }\n"): (typeof documents)["\n  fragment FragmentNodeUnion on NodeInterface {\n    __typename\n    id\n    title\n    status\n    path\n    langcode {\n      id\n    }\n    created {\n      timestamp\n    }\n    changed {\n      timestamp\n    }\n    metatag {\n      ...FragmentMetaTag\n    }\n    ...FragmentNodeArticle\n    ...FragmentNodeFrontpage\n    ...FragmentNodePage\n    ...FragmentNodeTestcontent\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentNodeArticle on NodeArticle {\n    excerpt\n    sticky\n    body {\n      ...FragmentTextSummary\n    }\n    image {\n      ...FragmentImage\n    }\n    author {\n      __typename\n      ... on User {\n        ...FragmentUser\n      }\n    }\n    translations {\n      ...FragmentNodeTranslation\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentNodeArticle on NodeArticle {\n    excerpt\n    sticky\n    body {\n      ...FragmentTextSummary\n    }\n    image {\n      ...FragmentImage\n    }\n    author {\n      __typename\n      ... on User {\n        ...FragmentUser\n      }\n    }\n    translations {\n      ...FragmentNodeTranslation\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentNodeFrontpage on NodeFrontpage {\n    contentElements {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # Here we include only the paragraph types that can actually be used in the field\n        # contentElements for this node type. Using the generated union type, we can be sure\n        # that all fragments we use here can actually be used.\n        ... on NodeFrontpageContentElementsUnion {\n          ...FragmentParagraphFormattedText\n          ...FragmentParagraphLink\n          ...FragmentParagraphImage\n          ...FragmentParagraphVideo\n          ...FragmentParagraphFileAttachments\n          ...FragmentParagraphHero\n          ...FragmentParagraphAccordion\n          ...FragmentParagraphListingArticle\n        }\n      }\n    }\n    translations {\n      ...FragmentNodeTranslation\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentNodeFrontpage on NodeFrontpage {\n    contentElements {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # Here we include only the paragraph types that can actually be used in the field\n        # contentElements for this node type. Using the generated union type, we can be sure\n        # that all fragments we use here can actually be used.\n        ... on NodeFrontpageContentElementsUnion {\n          ...FragmentParagraphFormattedText\n          ...FragmentParagraphLink\n          ...FragmentParagraphImage\n          ...FragmentParagraphVideo\n          ...FragmentParagraphFileAttachments\n          ...FragmentParagraphHero\n          ...FragmentParagraphAccordion\n          ...FragmentParagraphListingArticle\n        }\n      }\n    }\n    translations {\n      ...FragmentNodeTranslation\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentNodePage on NodePage {\n    contentElements {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # Here we include only the paragraph types that can actually be used in the field\n        # contentElements for this node type. Using the generated union type, we can be sure\n        # that all fragments we refer to here can actually be used.\n        ... on NodePageContentElementsUnion {\n          ...FragmentParagraphFormattedText\n          ...FragmentParagraphLink\n          ...FragmentParagraphImage\n          ...FragmentParagraphVideo\n          ...FragmentParagraphFileAttachments\n          ...FragmentParagraphHero\n          ...FragmentParagraphAccordion\n          ...FragmentParagraphListingArticle\n          ...FragmentParagraphAccordion\n        }\n      }\n    }\n    translations {\n      ...FragmentNodeTranslation\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentNodePage on NodePage {\n    contentElements {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # Here we include only the paragraph types that can actually be used in the field\n        # contentElements for this node type. Using the generated union type, we can be sure\n        # that all fragments we refer to here can actually be used.\n        ... on NodePageContentElementsUnion {\n          ...FragmentParagraphFormattedText\n          ...FragmentParagraphLink\n          ...FragmentParagraphImage\n          ...FragmentParagraphVideo\n          ...FragmentParagraphFileAttachments\n          ...FragmentParagraphHero\n          ...FragmentParagraphAccordion\n          ...FragmentParagraphListingArticle\n          ...FragmentParagraphAccordion\n        }\n      }\n    }\n    translations {\n      ...FragmentNodeTranslation\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentNodeTestcontent on NodeTestContent {\n    body {\n      ...FragmentTextSummary\n    }\n    testfield\n  }\n"): (typeof documents)["\n  fragment FragmentNodeTestcontent on NodeTestContent {\n    body {\n      ...FragmentTextSummary\n    }\n    testfield\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentArticleTeaser on NodeArticle {\n    __typename\n    id\n    image {\n      ...FragmentImage\n    }\n    path\n    title\n    sticky\n    excerpt\n    created {\n      timestamp\n    }\n    author {\n      __typename\n      ... on User {\n        ...FragmentUser\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentArticleTeaser on NodeArticle {\n    __typename\n    id\n    image {\n      ...FragmentImage\n    }\n    path\n    title\n    sticky\n    excerpt\n    created {\n      timestamp\n    }\n    author {\n      __typename\n      ... on User {\n        ...FragmentUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  # This fragment needs to reference ALL the other defined paragraph fragments in this file.\n  # Graphql-codegen will then generate a type with all possible variations of paragraphs\n  # that we need to typecast paragraphs in the frontend.\n  # You should not use this fragment in queries, but instead add the specific fragments for\n  # the paragraph types that are supported by each paragraph field.\n  fragment FragmentParagraphUnion on ParagraphInterface {\n    __typename\n    id\n    ...FragmentParagraphFormattedText\n    ...FragmentParagraphLink\n    ...FragmentParagraphImage\n    ...FragmentParagraphVideo\n    ...FragmentParagraphFileAttachments\n    ...FragmentParagraphHero\n    ...FragmentParagraphAccordion\n    ...FragmentParagraphAccordionItem\n    ...FragmentParagraphListingArticle\n  }\n"): (typeof documents)["\n  # This fragment needs to reference ALL the other defined paragraph fragments in this file.\n  # Graphql-codegen will then generate a type with all possible variations of paragraphs\n  # that we need to typecast paragraphs in the frontend.\n  # You should not use this fragment in queries, but instead add the specific fragments for\n  # the paragraph types that are supported by each paragraph field.\n  fragment FragmentParagraphUnion on ParagraphInterface {\n    __typename\n    id\n    ...FragmentParagraphFormattedText\n    ...FragmentParagraphLink\n    ...FragmentParagraphImage\n    ...FragmentParagraphVideo\n    ...FragmentParagraphFileAttachments\n    ...FragmentParagraphHero\n    ...FragmentParagraphAccordion\n    ...FragmentParagraphAccordionItem\n    ...FragmentParagraphListingArticle\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphFormattedText on ParagraphFormattedText {\n    # These fields are aliased here because they conflict with other instances\n    # of the same field in other paragraph types where they have different\n    # mandatory settings.\n    formattedTextHeading: heading\n    formattedTextText: formattedText {\n      ...FragmentText\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphFormattedText on ParagraphFormattedText {\n    # These fields are aliased here because they conflict with other instances\n    # of the same field in other paragraph types where they have different\n    # mandatory settings.\n    formattedTextHeading: heading\n    formattedTextText: formattedText {\n      ...FragmentText\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphLink on ParagraphLink {\n    links {\n      ...FragmentLink\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphLink on ParagraphLink {\n    links {\n      ...FragmentLink\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphImage on ParagraphImage {\n    image {\n      ...FragmentMediaUnion\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphImage on ParagraphImage {\n    image {\n      ...FragmentMediaUnion\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphVideo on ParagraphVideo {\n    video {\n      ...FragmentMediaUnion\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphVideo on ParagraphVideo {\n    video {\n      ...FragmentMediaUnion\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphFileAttachments on ParagraphFileAttachment {\n    fileAttachmentsParagraphHeading: heading\n    fileAttachmentsParagraphFormattedText: formattedText {\n      ...FragmentText\n    }\n    fileAttachments {\n      ...FragmentMediaUnion\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphFileAttachments on ParagraphFileAttachment {\n    fileAttachmentsParagraphHeading: heading\n    fileAttachmentsParagraphFormattedText: formattedText {\n      ...FragmentText\n    }\n    fileAttachments {\n      ...FragmentMediaUnion\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphHero on ParagraphHero {\n    formattedText {\n      ...FragmentText\n    }\n    image {\n      ...FragmentMediaUnion\n    }\n    primaryLink {\n      ...FragmentLink\n    }\n    secondaryLink {\n      ...FragmentLink\n    }\n    paragraphHeroHeading: heading\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphHero on ParagraphHero {\n    formattedText {\n      ...FragmentText\n    }\n    image {\n      ...FragmentMediaUnion\n    }\n    primaryLink {\n      ...FragmentLink\n    }\n    secondaryLink {\n      ...FragmentLink\n    }\n    paragraphHeroHeading: heading\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphAccordion on ParagraphAccordion {\n    heading\n    accordionLayout\n    primaryLink {\n      ...FragmentLink\n    }\n    accordionFormattedText: formattedText {\n      ...FragmentText\n    }\n    accordionItems {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # We include here only the paragraph types that can actually\n        # be used as accordion items.\n        ...FragmentParagraphAccordionItem\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphAccordion on ParagraphAccordion {\n    heading\n    accordionLayout\n    primaryLink {\n      ...FragmentLink\n    }\n    accordionFormattedText: formattedText {\n      ...FragmentText\n    }\n    accordionItems {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # We include here only the paragraph types that can actually\n        # be used as accordion items.\n        ...FragmentParagraphAccordionItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphAccordionItem on ParagraphAccordionItem {\n    __typename\n    id\n    accordionItemHeading: heading\n    accordionItemFormattedText: formattedText {\n      ...FragmentText\n    }\n    contentElements {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # Here we include only the paragraph types that can actually be used in the field\n        # contentElements for this paragraph type. Using the generated union type, we can be sure\n        # that all fragments we refer to here can actually be used.\n        ... on ParagraphAccordionItemContentElementsUnion {\n          ...FragmentParagraphFormattedText\n          ...FragmentParagraphImage\n          ...FragmentParagraphLink\n          ...FragmentParagraphFileAttachments\n          ...FragmentParagraphVideo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphAccordionItem on ParagraphAccordionItem {\n    __typename\n    id\n    accordionItemHeading: heading\n    accordionItemFormattedText: formattedText {\n      ...FragmentText\n    }\n    contentElements {\n      ... on ParagraphInterface {\n        __typename\n        id\n        # Here we include only the paragraph types that can actually be used in the field\n        # contentElements for this paragraph type. Using the generated union type, we can be sure\n        # that all fragments we refer to here can actually be used.\n        ... on ParagraphAccordionItemContentElementsUnion {\n          ...FragmentParagraphFormattedText\n          ...FragmentParagraphImage\n          ...FragmentParagraphLink\n          ...FragmentParagraphFileAttachments\n          ...FragmentParagraphVideo\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentParagraphListingArticle on ParagraphListingArticle {\n    __typename\n    id\n    paragraphListingArticleHeading: heading\n    limit\n  }\n"): (typeof documents)["\n  fragment FragmentParagraphListingArticle on ParagraphListingArticle {\n    __typename\n    id\n    paragraphListingArticleHeading: heading\n    limit\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FragmentUser on User {\n    name\n    mail\n  }\n"): (typeof documents)["\n  fragment FragmentUser on User {\n    name\n    mail\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNodeByPath($path: String!, $langcode: String!) {\n    route(path: $path, langcode: $langcode) {\n      __typename\n      ... on RouteInternal {\n        __typename\n        entity {\n          ...FragmentNodeUnion\n        }\n      }\n      ... on RouteRedirect {\n        __typename\n        status\n        url\n        internal\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetNodeByPath($path: String!, $langcode: String!) {\n    route(path: $path, langcode: $langcode) {\n      __typename\n      ... on RouteInternal {\n        __typename\n        entity {\n          ...FragmentNodeUnion\n        }\n      }\n      ... on RouteRedirect {\n        __typename\n        status\n        url\n        internal\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query getMenu($name: MenuAvailable!, $langcode: String!) {\n    menu(name: $name, langcode: $langcode) {\n      __typename\n      items {\n        id\n        description\n        url\n        title\n        internal\n        attributes {\n          class\n          icon\n        }\n        langcode {\n          id\n        }\n        children {\n          id\n          description\n          url\n          title\n          internal\n          attributes {\n            class\n            icon\n          }\n          langcode {\n            id\n          }\n          children {\n            id\n            description\n            url\n            title\n            internal\n            attributes {\n              class\n              icon\n            }\n            langcode {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMenu($name: MenuAvailable!, $langcode: String!) {\n    menu(name: $name, langcode: $langcode) {\n      __typename\n      items {\n        id\n        description\n        url\n        title\n        internal\n        attributes {\n          class\n          icon\n        }\n        langcode {\n          id\n        }\n        children {\n          id\n          description\n          url\n          title\n          internal\n          attributes {\n            class\n            icon\n          }\n          langcode {\n            id\n          }\n          children {\n            id\n            description\n            url\n            title\n            internal\n            attributes {\n              class\n              icon\n            }\n            langcode {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ArticleListing(\n    $langcode: String = \"en\"\n    $sticky: Boolean\n    $offset: Int = 0\n    $pageSize: Int = 10\n    $page: Int = 0\n  ) {\n    articlesView(\n      page: $page\n      pageSize: $pageSize\n      filter: { langcode: $langcode, sticky: $sticky }\n      offset: $offset\n    ) {\n      results {\n        __typename\n        ...FragmentArticleTeaser\n      }\n      pageInfo {\n        offset\n        page\n        pageSize\n        total\n      }\n    }\n  }\n"): (typeof documents)["\n  query ArticleListing(\n    $langcode: String = \"en\"\n    $sticky: Boolean\n    $offset: Int = 0\n    $pageSize: Int = 10\n    $page: Int = 0\n  ) {\n    articlesView(\n      page: $page\n      pageSize: $pageSize\n      filter: { langcode: $langcode, sticky: $sticky }\n      offset: $offset\n    ) {\n      results {\n        __typename\n        ...FragmentArticleTeaser\n      }\n      pageInfo {\n        offset\n        page\n        pageSize\n        total\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;