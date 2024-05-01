/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A cursor for use in pagination. */
  Cursor: { input: any; output: any; }
  /** An email address. */
  Email: { input: any; output: any; }
  /**
   * An HTML string
   *
   * Content of this type is deemed safe by the server for raw output given the
   * origin and the context of its usage. The HTML can still contain scripts or style
   * tags where the creating user had permission to input these.
   */
  Html: { input: any; output: any; }
  /** A field whose value conforms to the standard E.164 */
  PhoneNumber: { input: any; output: any; }
  /** RFC 3339 compliant time string. */
  Time: { input: any; output: any; }
  /** A field whose value exists in the standard IANA Time Zone Database. */
  TimeZone: { input: any; output: any; }
  /** Type represents date and time as number of milliseconds from start of the UNIX epoch. */
  Timestamp: { input: any; output: any; }
  /** Untyped structured data. Eg JSON, configuration, settings, attributes. */
  UntypedStructuredData: { input: any; output: any; }
  /** User roles. */
  UserRoles: { input: any; output: any; }
  /** A string that will have a value of format ±hh:mm */
  UtcOffset: { input: any; output: any; }
  _: { input: any; output: any; }
};

export type ArticlesViewFilterInput = {
  /** Translation language  */
  langcode?: InputMaybe<Scalars['String']['input']>;
  /** Sticky status  */
  sticky?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Result for view articles display graphql_1. */
export type ArticlesViewResult = View & {
  __typename?: 'ArticlesViewResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<NodeUnion>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

/** A paginated set of results. */
export type Connection = {
  /** The edges of this connection. */
  edges: Array<Edge>;
  /** The nodes of the edges of this connection. */
  nodes: Array<EdgeNode>;
  /** Information to aid in pagination. */
  pageInfo: ConnectionPageInfo;
};

/** Information about the page in a connection. */
export type ConnectionPageInfo = {
  __typename?: 'ConnectionPageInfo';
  /** The cursor for the last element in this page. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** Whether there are more pages in this connection. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Whether there are previous pages in this connection. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The cursor for the first element in this page. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** Choose how your sorts will occur and on which field. */
export enum ConnectionSortKeys {
  /** Sort by creation date */
  CreatedAt = 'CREATED_AT',
  /** Sort by promoted status. */
  Promoted = 'PROMOTED',
  /** Sort by sticky status. */
  Sticky = 'STICKY',
  /** Sort by entity title. */
  Title = 'TITLE',
  /** Sort by updated date */
  UpdatedAt = 'UPDATED_AT'
}

/** A Date range has a start and an end. */
export type DateRange = {
  __typename?: 'DateRange';
  /** The end of the date range. */
  end?: Maybe<DateTime>;
  /** The start of the date range. */
  start?: Maybe<DateTime>;
};

/** A DateTime object. */
export type DateTime = {
  __typename?: 'DateTime';
  /** A string that will have a value of format ±hh:mm */
  offset: Scalars['UtcOffset']['output'];
  /** RFC 3339 compliant time string. */
  time: Scalars['Time']['output'];
  /** Type represents date and time as number of milliseconds from start of the UNIX epoch. */
  timestamp: Scalars['Timestamp']['output'];
  /** A field whose value exists in the standard IANA Time Zone Database. */
  timezone: Scalars['TimeZone']['output'];
};

/**
 * An edge in a connection.
 * Provides the cursor to fetch data based on the position of the associated
 * node. Specific edge implementations may provide more information about the
 * relationship they represent.
 */
export type Edge = {
  cursor: Scalars['Cursor']['output'];
  node: EdgeNode;
};

/** This entity is accessible over an Edge connection. */
export type EdgeNode = {
  id: Scalars['ID']['output'];
};

/** A file object to represent an managed file. */
export type File = {
  __typename?: 'File';
  /** The description of the file. */
  description?: Maybe<Scalars['String']['output']>;
  /** The mime type of the file. */
  mime?: Maybe<Scalars['String']['output']>;
  /** The name of the file. */
  name?: Maybe<Scalars['String']['output']>;
  /** The size of the file in bytes. */
  size: Scalars['Int']['output'];
  /** The URL of the file. */
  url: Scalars['String']['output'];
};

/** A image object to represent an managed file. */
export type Image = {
  __typename?: 'Image';
  /** The alt text of the image. */
  alt?: Maybe<Scalars['String']['output']>;
  /** The height of the image. */
  height: Scalars['Int']['output'];
  /** The mime type of the image. */
  mime?: Maybe<Scalars['String']['output']>;
  /** The size of the image in bytes. */
  size: Scalars['Int']['output'];
  /** The title text of the image. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL of the image. */
  url: Scalars['String']['output'];
  /** The width of the image. */
  width: Scalars['Int']['output'];
};

/** Generic untyped input for key-value pairs. */
export type KeyValueInput = {
  key: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

/** A language definition provided by the CMS. */
export type Language = {
  __typename?: 'Language';
  /** The language direction. */
  direction?: Maybe<Scalars['String']['output']>;
  /** The language code. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The language name. */
  name?: Maybe<Scalars['String']['output']>;
};

/** A link. */
export type Link = {
  __typename?: 'Link';
  /** Whether the link is internal to this website. */
  internal: Scalars['Boolean']['output'];
  /** The title of the link. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL of the link. */
  url?: Maybe<Scalars['String']['output']>;
};

/** A locally hosted audio file. */
export type MediaAudio = EdgeNode & MediaInterface & MetaTagInterface & {
  __typename?: 'MediaAudio';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** Audio file */
  mediaAudioFile: File;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path: Scalars['String']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Available translations for content. */
  translations: Array<Translation>;
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A paginated set of results for MediaAudio. */
export type MediaAudioConnection = Connection & {
  __typename?: 'MediaAudioConnection';
  edges: Array<MediaAudioEdge>;
  nodes: Array<MediaAudio>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for MediaAudio. */
export type MediaAudioEdge = Edge & {
  __typename?: 'MediaAudioEdge';
  cursor: Scalars['Cursor']['output'];
  node: MediaAudio;
};

/** An uploaded file or document, such as a PDF. */
export type MediaDocument = EdgeNode & MediaInterface & MetaTagInterface & {
  __typename?: 'MediaDocument';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** Document */
  mediaDocument: File;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path: Scalars['String']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Available translations for content. */
  translations: Array<Translation>;
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A paginated set of results for MediaDocument. */
export type MediaDocumentConnection = Connection & {
  __typename?: 'MediaDocumentConnection';
  edges: Array<MediaDocumentEdge>;
  nodes: Array<MediaDocument>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for MediaDocument. */
export type MediaDocumentEdge = Edge & {
  __typename?: 'MediaDocumentEdge';
  cursor: Scalars['Cursor']['output'];
  node: MediaDocument;
};

/** Use local images for reusable media. */
export type MediaImage = EdgeNode & MediaInterface & MetaTagInterface & {
  __typename?: 'MediaImage';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** Image */
  mediaImage: Image;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path: Scalars['String']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Available translations for content. */
  translations: Array<Translation>;
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A paginated set of results for MediaImage. */
export type MediaImageConnection = Connection & {
  __typename?: 'MediaImageConnection';
  edges: Array<MediaImageEdge>;
  nodes: Array<MediaImage>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for MediaImage. */
export type MediaImageEdge = Edge & {
  __typename?: 'MediaImageEdge';
  cursor: Scalars['Cursor']['output'];
  node: MediaImage;
};

/** Entity type media. */
export type MediaInterface = {
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path: Scalars['String']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A remotely hosted video from YouTube or Vimeo. */
export type MediaRemoteVideo = EdgeNode & MediaInterface & MetaTagInterface & {
  __typename?: 'MediaRemoteVideo';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** Video URL */
  mediaOembedVideo: Scalars['String']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path: Scalars['String']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Available translations for content. */
  translations: Array<Translation>;
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A paginated set of results for MediaRemoteVideo. */
export type MediaRemoteVideoConnection = Connection & {
  __typename?: 'MediaRemoteVideoConnection';
  edges: Array<MediaRemoteVideoEdge>;
  nodes: Array<MediaRemoteVideo>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for MediaRemoteVideo. */
export type MediaRemoteVideoEdge = Edge & {
  __typename?: 'MediaRemoteVideoEdge';
  cursor: Scalars['Cursor']['output'];
  node: MediaRemoteVideo;
};

/** Entity type media. */
export type MediaUnion = MediaAudio | MediaDocument | MediaImage | MediaRemoteVideo | MediaVideo;

/** A locally hosted video file. */
export type MediaVideo = EdgeNode & MediaInterface & MetaTagInterface & {
  __typename?: 'MediaVideo';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** Video file */
  mediaVideoFile: File;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path: Scalars['String']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Available translations for content. */
  translations: Array<Translation>;
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A paginated set of results for MediaVideo. */
export type MediaVideoConnection = Connection & {
  __typename?: 'MediaVideoConnection';
  edges: Array<MediaVideoEdge>;
  nodes: Array<MediaVideo>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for MediaVideo. */
export type MediaVideoEdge = Edge & {
  __typename?: 'MediaVideoEdge';
  cursor: Scalars['Cursor']['output'];
  node: MediaVideo;
};

/** Entity type menu. */
export type Menu = MenuInterface & {
  __typename?: 'Menu';
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The menu items. */
  items: Array<MenuItem>;
  /** The menu name. */
  name: Scalars['String']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** List of menus available to load. */
export enum MenuAvailable {
  /** Footer */
  Footer = 'FOOTER',
  /** Main navigation */
  Main = 'MAIN'
}

/** Entity type menu. */
export type MenuInterface = {
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The menu items. */
  items: Array<MenuItem>;
  /** The menu name. */
  name: Scalars['String']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A menu item defined in the CMS. */
export type MenuItem = {
  __typename?: 'MenuItem';
  /** Attributes of this menu item. */
  attributes: MenuItemAttributes;
  /** Child menu items of this menu item. */
  children: Array<MenuItem>;
  /** The description of the menu item. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether this menu item is intended to be expanded. */
  expanded: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Whether this menu item links to an internal route. */
  internal: Scalars['Boolean']['output'];
  /** The language of the menu item. */
  langcode: Language;
  /** The route this menu item uses. Route loading can be disabled per menu type. */
  route?: Maybe<RouteUnion>;
  /** The title of the menu item. */
  title: Scalars['String']['output'];
  /** The URL of the menu item. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Menu item options set within the CMS. */
export type MenuItemAttributes = {
  __typename?: 'MenuItemAttributes';
  class?: Maybe<Scalars['String']['output']>;
  /** Menu item attribute icon. */
  icon?: Maybe<Scalars['String']['output']>;
};

/** Entity type menu. */
export type MenuUnion = Menu;

/** A meta tag element. */
export type MetaTag = {
  /** The HTML tag for this meta element. */
  tag: Scalars['String']['output'];
};

/** This entity has meta tags enabled. */
export type MetaTagInterface = {
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
};

/** A meta link element. */
export type MetaTagLink = MetaTag & {
  __typename?: 'MetaTagLink';
  /** The meta tag element attributes. */
  attributes: MetaTagLinkAttributes;
  /** The HTML tag for this meta element. */
  tag: Scalars['String']['output'];
};

/** A meta link element's attributes. */
export type MetaTagLinkAttributes = {
  __typename?: 'MetaTagLinkAttributes';
  /** Specifies the location of the linked document. */
  href?: Maybe<Scalars['String']['output']>;
  /** Specifies the location of the linked document. */
  hreflang?: Maybe<Scalars['String']['output']>;
  /** Specifies on what device the linked document will be displayed. */
  media?: Maybe<Scalars['String']['output']>;
  /** Specifies the relationship between the current document and the linked document. */
  rel?: Maybe<Scalars['String']['output']>;
  /** Specifies the size of the linked resource. Only for rel="icon". */
  sizes?: Maybe<Scalars['String']['output']>;
  /** Specifies the media type of the linked document. */
  type?: Maybe<Scalars['String']['output']>;
};

/** A meta property element. */
export type MetaTagProperty = MetaTag & {
  __typename?: 'MetaTagProperty';
  /** The meta tag element attributes. */
  attributes: MetaTagPropertyAttributes;
  /** The HTML tag for this meta element. */
  tag: Scalars['String']['output'];
};

/** A meta property element's attributes. */
export type MetaTagPropertyAttributes = {
  __typename?: 'MetaTagPropertyAttributes';
  /** The content attribute of the meta tag. */
  content?: Maybe<Scalars['String']['output']>;
  /** The property attribute of the meta tag. */
  property?: Maybe<Scalars['String']['output']>;
};

/** A meta script element. */
export type MetaTagScript = MetaTag & {
  __typename?: 'MetaTagScript';
  /** The meta tag element attributes. */
  attributes: MetaTagScriptAttributes;
  /** The content of the script tag. */
  content?: Maybe<Scalars['String']['output']>;
  /** The HTML tag for this meta element. */
  tag: Scalars['String']['output'];
};

/** A meta script element's attributes. */
export type MetaTagScriptAttributes = {
  __typename?: 'MetaTagScriptAttributes';
  /** The integrity attribute of the script tag. */
  integrity?: Maybe<Scalars['String']['output']>;
  /** The src attribute of the script tag. */
  src?: Maybe<Scalars['String']['output']>;
  /** The type attribute of the script tag. */
  type?: Maybe<Scalars['String']['output']>;
};

/** A meta tag element. */
export type MetaTagUnion = MetaTagLink | MetaTagProperty | MetaTagScript | MetaTagValue;

/** A meta content element. */
export type MetaTagValue = MetaTag & {
  __typename?: 'MetaTagValue';
  /** The meta tag element attributes. */
  attributes: MetaTagValueAttributes;
  /** The HTML tag for this meta element. */
  tag: Scalars['String']['output'];
};

/** A meta content element's attributes. */
export type MetaTagValueAttributes = {
  __typename?: 'MetaTagValueAttributes';
  /** The content attribute of the meta tag. */
  content?: Maybe<Scalars['String']['output']>;
  /** The name attribute of the meta tag. */
  name?: Maybe<Scalars['String']['output']>;
};

/** A GraphQL mutation is a request that changes data on the server. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Placeholder field to enable schema mutation extension. */
  _: Scalars['Boolean']['output'];
};

/** Use <em>articles</em> for time-sensitive content like news, press releases or blog posts. */
export type NodeArticle = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeArticle';
  /** The author of this content. */
  author?: Maybe<User>;
  /** Body */
  body?: Maybe<TextSummary>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** Add an excerpt for this piece of content. It will also be used for search results and HTML meta tags. */
  excerpt?: Maybe<Scalars['String']['output']>;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Image */
  image?: Maybe<Image>;
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path: Scalars['String']['output'];
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Enter a comma-separated list. For example: Amsterdam, Mexico City, "Cleveland, Ohio" */
  tags?: Maybe<Array<UnsupportedType>>;
  /** Title */
  title: Scalars['String']['output'];
  /** Available translations for content. */
  translations: Array<Translation>;
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A paginated set of results for NodeArticle. */
export type NodeArticleConnection = Connection & {
  __typename?: 'NodeArticleConnection';
  edges: Array<NodeArticleEdge>;
  nodes: Array<NodeArticle>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeArticle. */
export type NodeArticleEdge = Edge & {
  __typename?: 'NodeArticleEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeArticle;
};

/** Represents the frontpage of the site. Only one content of this type can be created. */
export type NodeFrontpage = MetaTagInterface & NodeInterface & {
  __typename?: 'NodeFrontpage';
  /** The author of this content. */
  author?: Maybe<User>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** Content elements */
  contentElements: Array<NodeFrontpageContentElementsUnion>;
  /** The date and time that the content was created. */
  created: DateTime;
  /** Add an excerpt for this piece of content. It will also be used for search results and HTML meta tags. */
  excerpt?: Maybe<Scalars['String']['output']>;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Image used in the search results and for Open Graph HTML meta tags, so that sharing the content looks good. */
  image?: Maybe<Image>;
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path: Scalars['String']['output'];
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Title */
  title: Scalars['String']['output'];
  /** Available translations for content. */
  translations: Array<Translation>;
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** Content elements */
export type NodeFrontpageContentElementsUnion = ParagraphAccordion | ParagraphFileAttachment | ParagraphFormattedText | ParagraphHero | ParagraphImage | ParagraphLink | ParagraphListingArticle | ParagraphVideo;

/** Entity type node. */
export type NodeInterface = {
  /** The author of this content. */
  author?: Maybe<User>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path: Scalars['String']['output'];
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Title */
  title: Scalars['String']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** Page content type. Contains paragraphs. */
export type NodePage = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodePage';
  /** The author of this content. */
  author?: Maybe<User>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** Content elements */
  contentElements: Array<NodePageContentElementsUnion>;
  /** The date and time that the content was created. */
  created: DateTime;
  /** Add an excerpt for this piece of content. It will also be used for search results and HTML meta tags. */
  excerpt?: Maybe<Scalars['String']['output']>;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Image used in the search results and for Open Graph HTML meta tags, so that sharing the content looks good. */
  image?: Maybe<Image>;
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path: Scalars['String']['output'];
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Title */
  title: Scalars['String']['output'];
  /** Available translations for content. */
  translations: Array<Translation>;
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A paginated set of results for NodePage. */
export type NodePageConnection = Connection & {
  __typename?: 'NodePageConnection';
  edges: Array<NodePageEdge>;
  nodes: Array<NodePage>;
  pageInfo: ConnectionPageInfo;
};

/** Content elements */
export type NodePageContentElementsUnion = ParagraphAccordion | ParagraphFileAttachment | ParagraphFormattedText | ParagraphHero | ParagraphImage | ParagraphLink | ParagraphListingArticle | ParagraphVideo;

/** Edge for NodePage. */
export type NodePageEdge = Edge & {
  __typename?: 'NodePageEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodePage;
};

/** Entity type node. */
export type NodeTestContent = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeTestContent';
  /** The author of this content. */
  author?: Maybe<User>;
  /** Body */
  body?: Maybe<TextSummary>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path: Scalars['String']['output'];
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Testfield */
  testfield?: Maybe<Scalars['String']['output']>;
  /** Title */
  title: Scalars['String']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A paginated set of results for NodeTestContent. */
export type NodeTestContentConnection = Connection & {
  __typename?: 'NodeTestContentConnection';
  edges: Array<NodeTestContentEdge>;
  nodes: Array<NodeTestContent>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeTestContent. */
export type NodeTestContentEdge = Edge & {
  __typename?: 'NodeTestContentEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeTestContent;
};

/** Entity type node. */
export type NodeUnion = NodeArticle | NodeFrontpage | NodePage | NodeTestContent;

/** This paragraph type holds an accordion. */
export type ParagraphAccordion = ParagraphInterface & {
  __typename?: 'ParagraphAccordion';
  /** Accordion items */
  accordionItems: Array<ParagraphAccordionItem>;
  /** Select the layout for this accordion paragraph. */
  accordionLayout: Scalars['String']['output'];
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** Formatted text */
  formattedText?: Maybe<Text>;
  /** Heading for the whole accordion */
  heading?: Maybe<Scalars['String']['output']>;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Primary link */
  primaryLink?: Maybe<Link>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** This paragraph holds an accordion item, with a title and other paragraphs as content. */
export type ParagraphAccordionItem = ParagraphInterface & {
  __typename?: 'ParagraphAccordionItem';
  /** Add one or more paragraphs to display in this accordion item. */
  contentElements: Array<ParagraphAccordionItemContentElementsUnion>;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** Formatted text */
  formattedText?: Maybe<Text>;
  /** Heading */
  heading: Scalars['String']['output'];
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** Add one or more paragraphs to display in this accordion item. */
export type ParagraphAccordionItemContentElementsUnion = ParagraphFileAttachment | ParagraphFormattedText | ParagraphImage | ParagraphLink | ParagraphVideo;

/** Entity type paragraph. */
export type ParagraphFileAttachment = ParagraphInterface & {
  __typename?: 'ParagraphFileAttachment';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** File attachments */
  fileAttachments: Array<MediaDocument>;
  /** Formatted text */
  formattedText?: Maybe<Text>;
  /** Heading */
  heading?: Maybe<Scalars['String']['output']>;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A paragraph containing formatted text */
export type ParagraphFormattedText = ParagraphInterface & {
  __typename?: 'ParagraphFormattedText';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** Formatted text */
  formattedText: Text;
  /** Heading */
  heading?: Maybe<Scalars['String']['output']>;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** Entity type paragraph. */
export type ParagraphHero = ParagraphInterface & {
  __typename?: 'ParagraphHero';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** Formatted text */
  formattedText?: Maybe<Text>;
  /** Heading */
  heading: Scalars['String']['output'];
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Image */
  image: MediaImage;
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Primary link */
  primaryLink?: Maybe<Link>;
  /** Secondary link */
  secondaryLink?: Maybe<Link>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** A paragraph containing an image. */
export type ParagraphImage = ParagraphInterface & {
  __typename?: 'ParagraphImage';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** Image */
  image: MediaImage;
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** Entity type paragraph. */
export type ParagraphInterface = {
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** a paragraph type containing a list of links. */
export type ParagraphLink = ParagraphInterface & {
  __typename?: 'ParagraphLink';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Add a list of links. */
  links: Array<Link>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** Renders a listing of articles in the frontend. */
export type ParagraphListingArticle = ParagraphInterface & {
  __typename?: 'ParagraphListingArticle';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** Heading */
  heading: Scalars['String']['output'];
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Choose how many items at most you want to display for the listing. */
  limit: Scalars['Int']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** Entity type paragraph. */
export type ParagraphUnion = ParagraphAccordion | ParagraphAccordionItem | ParagraphFileAttachment | ParagraphFormattedText | ParagraphHero | ParagraphImage | ParagraphLink | ParagraphListingArticle | ParagraphVideo;

/** Paragraph containing a video */
export type ParagraphVideo = ParagraphInterface & {
  __typename?: 'ParagraphVideo';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
  /** Video */
  video: ParagraphVideoVideoUnion;
};

/** Video */
export type ParagraphVideoVideoUnion = MediaRemoteVideo | MediaVideo;

/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type Query = {
  __typename?: 'Query';
  /** Query for view articles display graphql_1. */
  articlesView?: Maybe<ArticlesViewResult>;
  /** Schema information. */
  info: SchemaInformation;
  /** Load a Media entity by id. */
  media?: Maybe<MediaUnion>;
  /** List of all MediaAudio on the platform. */
  mediaAudioItems: MediaAudioConnection;
  /** List of all MediaDocument on the platform. */
  mediaDocuments: MediaDocumentConnection;
  /** List of all MediaImage on the platform. */
  mediaImages: MediaImageConnection;
  /** List of all MediaRemoteVideo on the platform. */
  mediaRemoteVideos: MediaRemoteVideoConnection;
  /** List of all MediaVideo on the platform. */
  mediaVideos: MediaVideoConnection;
  /** Load a Menu by name. */
  menu?: Maybe<Menu>;
  /** Load a Node entity by id. */
  node?: Maybe<NodeUnion>;
  /** List of all NodeArticle on the platform. */
  nodeArticles: NodeArticleConnection;
  /** List of all NodePage on the platform. */
  nodePages: NodePageConnection;
  /** List of all NodeTestContent on the platform. */
  nodeTestContents: NodeTestContentConnection;
  /** Load a Route by path. */
  route?: Maybe<RouteUnion>;
  /** Get information about the currently authenticated user. NULL if not logged in. */
  viewer?: Maybe<User>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryArticlesViewArgs = {
  filter?: InputMaybe<ArticlesViewFilterInput>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortDir?: InputMaybe<SortDirection>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryMediaArgs = {
  id: Scalars['ID']['input'];
  langcode?: InputMaybe<Scalars['String']['input']>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryMediaAudioItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  langcode?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryMediaDocumentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  langcode?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryMediaImagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  langcode?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryMediaRemoteVideosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  langcode?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryMediaVideosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  langcode?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryMenuArgs = {
  langcode?: InputMaybe<Scalars['String']['input']>;
  name: MenuAvailable;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
  langcode?: InputMaybe<Scalars['String']['input']>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryNodeArticlesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  langcode?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryNodePagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  langcode?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryNodeTestContentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  langcode?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/**
 * The schema's entry-point for queries.
 *
 * This acts as the public, top-level API from which all queries must start.
 */
export type QueryRouteArgs = {
  langcode?: InputMaybe<Scalars['String']['input']>;
  path: Scalars['String']['input'];
};

/** Routes represent incoming requests that resolve to content. */
export type Route = {
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** A list of possible entities that can be returned by URL. */
export type RouteEntityUnion = NodeArticle | NodeFrontpage | NodePage | NodeTestContent;

/** Route outside of this website. */
export type RouteExternal = Route & {
  __typename?: 'RouteExternal';
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Route within this website. */
export type RouteInternal = Route & {
  __typename?: 'RouteInternal';
  /** Breadcrumb links for this route. */
  breadcrumbs?: Maybe<Array<Link>>;
  /** Content assigned to this route. */
  entity?: Maybe<RouteEntityUnion>;
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Redirect to another URL with status. */
export type RouteRedirect = Route & {
  __typename?: 'RouteRedirect';
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** Utility prop. Always true for redirects. */
  redirect: Scalars['Boolean']['output'];
  /** Suggested status for redirect. Eg 301. */
  status: Scalars['Int']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Route types that can exist in the system. */
export type RouteUnion = RouteExternal | RouteInternal | RouteRedirect;

/** Schema information provided by the system. */
export type SchemaInformation = {
  __typename?: 'SchemaInformation';
  /** The schema description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The internal path to the front page. */
  home?: Maybe<Scalars['String']['output']>;
  /** List of languages available. */
  languages: Array<Language>;
  /** The schema version. */
  version?: Maybe<Scalars['String']['output']>;
};

/** Sort direction. */
export enum SortDirection {
  /** Ascending */
  Asc = 'ASC',
  /** Descending */
  Desc = 'DESC'
}

/** A processed text format defined by the CMS. */
export type Text = {
  __typename?: 'Text';
  /** The text format used to process the text value. */
  format?: Maybe<Scalars['String']['output']>;
  /** The processed text value. */
  processed?: Maybe<Scalars['Html']['output']>;
  /** The raw text value. */
  value?: Maybe<Scalars['String']['output']>;
};

/** A processed text format with summary defined by the CMS. */
export type TextSummary = {
  __typename?: 'TextSummary';
  /** The text format used to process the text value. */
  format?: Maybe<Scalars['String']['output']>;
  /** The processed text value. */
  processed?: Maybe<Scalars['Html']['output']>;
  /** The processed text summary. */
  summary?: Maybe<Scalars['Html']['output']>;
  /** The raw text value. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Available translations for content. */
export type Translation = {
  __typename?: 'Translation';
  /** The language of the translation. */
  langcode: Language;
  /** The path to the translated content. */
  path?: Maybe<Scalars['String']['output']>;
  /** The title of the translation. */
  title?: Maybe<Scalars['String']['output']>;
};

/**
 * Unsupported entity or field type in the schema.
 * This entity may not have been enabled in the schema yet and is being referenced via entity reference.
 */
export type UnsupportedType = {
  __typename?: 'UnsupportedType';
  /** Unsupported type, always TRUE. */
  unsupported?: Maybe<Scalars['Boolean']['output']>;
};

/** Entity type user. */
export type User = MetaTagInterface & UserInterface & {
  __typename?: 'User';
  /** The time that the user was last edited. */
  changed: DateTime;
  /** The time that the user was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The email of this user. */
  mail?: Maybe<Scalars['Email']['output']>;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** The name of this user. */
  name: Scalars['String']['output'];
  /** URL alias */
  path: Scalars['String']['output'];
  /** The roles the user has. */
  roles?: Maybe<Array<Scalars['UserRoles']['output']>>;
  /** Whether the user is active or blocked. */
  status: UserStatus;
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** Entity type user. */
export type UserInterface = {
  /** The time that the user was last edited. */
  changed: DateTime;
  /** The time that the user was created. */
  created: DateTime;
  /** The entity ID. */
  id: Scalars['ID']['output'];
  /** The email of this user. */
  mail?: Maybe<Scalars['Email']['output']>;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** The name of this user. */
  name: Scalars['String']['output'];
  /** URL alias */
  path: Scalars['String']['output'];
  /** The roles the user has. */
  roles?: Maybe<Array<Scalars['UserRoles']['output']>>;
  /** Whether the user is active or blocked. */
  status: UserStatus;
  /** The Universally Unique IDentifier (UUID). */
  uuid: Scalars['ID']['output'];
};

/** Whether the user is active or blocked. */
export enum UserStatus {
  /** An active user is able to login on the platform and view content */
  Active = 'ACTIVE',
  /** A blocked user is unable to access the platform, although their content will still be visible until it's deleted. */
  Blocked = 'BLOCKED'
}

/** Entity type user. */
export type UserUnion = User;

/** Views represent collections of curated data from the CMS. */
export type View = {
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

/** Information about the page in a view. */
export type ViewPageInfo = {
  __typename?: 'ViewPageInfo';
  /** Any result offset being used. */
  offset: Scalars['Int']['output'];
  /** The current page being returned. */
  page: Scalars['Int']['output'];
  /** How many results per page. */
  pageSize: Scalars['Int']['output'];
  /** How many results total. */
  total: Scalars['Int']['output'];
};

/** A reference to an embedded view */
export type ViewReference = {
  __typename?: 'ViewReference';
  contextualFilter?: Maybe<Array<Scalars['String']['output']>>;
  display: Scalars['String']['output'];
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** The name of the query used to fetch the data, if the view is a GraphQL display. */
  query?: Maybe<Scalars['String']['output']>;
  view: Scalars['String']['output'];
};

/** All available view result types. */
export type ViewResultUnion = ArticlesViewResult;

export type FragmentTextFragment = { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null };

export type FragmentTextSummaryFragment = { __typename?: 'TextSummary', value?: string | null, processed?: any | null, format?: string | null, summary?: any | null };

export type FragmentFormattedTitleFragment = { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null };

export type FragmentLinkFragment = { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean };

export type FragmentFileFragment = { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null };

export type FragmentImageFragment = { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null };

export type FragmentMetaTagFragment = { __typename: 'MetaTagValue', tag: string, attributes: { __typename?: 'MetaTagValueAttributes', name?: string | null, content?: string | null } };

export type FragmentNodeTranslationFragment = { __typename: 'Translation', path?: string | null, langcode: { __typename?: 'Language', id?: string | null } };

type FragmentMediaUnion_MediaAudio_Fragment = { __typename: 'MediaAudio', id: string, name: string, mediaAudioFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } };

type FragmentMediaUnion_MediaDocument_Fragment = { __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } };

type FragmentMediaUnion_MediaImage_Fragment = { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } };

type FragmentMediaUnion_MediaRemoteVideo_Fragment = { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string };

type FragmentMediaUnion_MediaVideo_Fragment = { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } };

export type FragmentMediaUnionFragment = FragmentMediaUnion_MediaAudio_Fragment | FragmentMediaUnion_MediaDocument_Fragment | FragmentMediaUnion_MediaImage_Fragment | FragmentMediaUnion_MediaRemoteVideo_Fragment | FragmentMediaUnion_MediaVideo_Fragment;

export type FragmentMediaAudioFragment = { __typename?: 'MediaAudio', name: string, mediaAudioFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } };

export type FragmentMediaVideoFragment = { __typename?: 'MediaVideo', name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } };

export type FragmentMediaDocumentFragment = { __typename?: 'MediaDocument', name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } };

export type FragmentMediaImageFragment = { __typename?: 'MediaImage', name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } };

export type FragmentMediaRemoteVideoFragment = { __typename?: 'MediaRemoteVideo', name: string, mediaOembedVideo: string };

type FragmentNodeUnion_NodeArticle_Fragment = { __typename: 'NodeArticle', id: string, title: string, status: boolean, path: string, excerpt?: string | null, sticky: boolean, langcode: { __typename?: 'Language', id?: string | null }, created: { __typename?: 'DateTime', timestamp: any }, changed: { __typename?: 'DateTime', timestamp: any }, metatag: Array<{ __typename?: 'MetaTagLink' } | { __typename?: 'MetaTagProperty' } | { __typename?: 'MetaTagScript' } | { __typename: 'MetaTagValue', tag: string, attributes: { __typename?: 'MetaTagValueAttributes', name?: string | null, content?: string | null } }>, body?: { __typename?: 'TextSummary', value?: string | null, processed?: any | null, format?: string | null, summary?: any | null } | null, image?: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } | null, author?: { __typename: 'User', name: string, mail?: any | null } | null, translations: Array<{ __typename: 'Translation', path?: string | null, langcode: { __typename?: 'Language', id?: string | null } }> };

type FragmentNodeUnion_NodeFrontpage_Fragment = { __typename: 'NodeFrontpage', id: string, title: string, status: boolean, path: string, langcode: { __typename?: 'Language', id?: string | null }, created: { __typename?: 'DateTime', timestamp: any }, changed: { __typename?: 'DateTime', timestamp: any }, metatag: Array<{ __typename?: 'MetaTagLink' } | { __typename?: 'MetaTagProperty' } | { __typename?: 'MetaTagScript' } | { __typename: 'MetaTagValue', tag: string, attributes: { __typename?: 'MetaTagValueAttributes', name?: string | null, content?: string | null } }>, contentElements: Array<{ __typename: 'ParagraphAccordion', id: string, heading?: string | null, accordionLayout: string, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, accordionFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, accordionItems: Array<{ __typename: 'ParagraphAccordionItem', id: string, accordionItemHeading: string, accordionItemFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, contentElements: Array<{ __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }> }> } | { __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphHero', id: string, paragraphHeroHeading: string, formattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } }, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, secondaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphListingArticle', id: string, limit: number, paragraphListingArticleHeading: string } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }>, translations: Array<{ __typename: 'Translation', path?: string | null, langcode: { __typename?: 'Language', id?: string | null } }> };

type FragmentNodeUnion_NodePage_Fragment = { __typename: 'NodePage', id: string, title: string, status: boolean, path: string, langcode: { __typename?: 'Language', id?: string | null }, created: { __typename?: 'DateTime', timestamp: any }, changed: { __typename?: 'DateTime', timestamp: any }, metatag: Array<{ __typename?: 'MetaTagLink' } | { __typename?: 'MetaTagProperty' } | { __typename?: 'MetaTagScript' } | { __typename: 'MetaTagValue', tag: string, attributes: { __typename?: 'MetaTagValueAttributes', name?: string | null, content?: string | null } }>, contentElements: Array<{ __typename: 'ParagraphAccordion', id: string, heading?: string | null, accordionLayout: string, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, accordionFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, accordionItems: Array<{ __typename: 'ParagraphAccordionItem', id: string, accordionItemHeading: string, accordionItemFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, contentElements: Array<{ __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }> }> } | { __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphHero', id: string, paragraphHeroHeading: string, formattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } }, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, secondaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphListingArticle', id: string, limit: number, paragraphListingArticleHeading: string } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }>, translations: Array<{ __typename: 'Translation', path?: string | null, langcode: { __typename?: 'Language', id?: string | null } }> };

type FragmentNodeUnion_NodeTestContent_Fragment = { __typename: 'NodeTestContent', id: string, title: string, status: boolean, path: string, testfield?: string | null, langcode: { __typename?: 'Language', id?: string | null }, created: { __typename?: 'DateTime', timestamp: any }, changed: { __typename?: 'DateTime', timestamp: any }, metatag: Array<{ __typename?: 'MetaTagLink' } | { __typename?: 'MetaTagProperty' } | { __typename?: 'MetaTagScript' } | { __typename: 'MetaTagValue', tag: string, attributes: { __typename?: 'MetaTagValueAttributes', name?: string | null, content?: string | null } }>, body?: { __typename?: 'TextSummary', value?: string | null, processed?: any | null, format?: string | null, summary?: any | null } | null };

export type FragmentNodeUnionFragment = FragmentNodeUnion_NodeArticle_Fragment | FragmentNodeUnion_NodeFrontpage_Fragment | FragmentNodeUnion_NodePage_Fragment | FragmentNodeUnion_NodeTestContent_Fragment;

export type FragmentNodeArticleFragment = { __typename?: 'NodeArticle', excerpt?: string | null, sticky: boolean, body?: { __typename?: 'TextSummary', value?: string | null, processed?: any | null, format?: string | null, summary?: any | null } | null, image?: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } | null, author?: { __typename: 'User', name: string, mail?: any | null } | null, translations: Array<{ __typename: 'Translation', path?: string | null, langcode: { __typename?: 'Language', id?: string | null } }> };

export type FragmentNodeFrontpageFragment = { __typename?: 'NodeFrontpage', contentElements: Array<{ __typename: 'ParagraphAccordion', id: string, heading?: string | null, accordionLayout: string, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, accordionFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, accordionItems: Array<{ __typename: 'ParagraphAccordionItem', id: string, accordionItemHeading: string, accordionItemFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, contentElements: Array<{ __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }> }> } | { __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphHero', id: string, paragraphHeroHeading: string, formattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } }, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, secondaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphListingArticle', id: string, limit: number, paragraphListingArticleHeading: string } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }>, translations: Array<{ __typename: 'Translation', path?: string | null, langcode: { __typename?: 'Language', id?: string | null } }> };

export type FragmentNodePageFragment = { __typename?: 'NodePage', contentElements: Array<{ __typename: 'ParagraphAccordion', id: string, heading?: string | null, accordionLayout: string, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, accordionFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, accordionItems: Array<{ __typename: 'ParagraphAccordionItem', id: string, accordionItemHeading: string, accordionItemFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, contentElements: Array<{ __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }> }> } | { __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphHero', id: string, paragraphHeroHeading: string, formattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } }, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, secondaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphListingArticle', id: string, limit: number, paragraphListingArticleHeading: string } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }>, translations: Array<{ __typename: 'Translation', path?: string | null, langcode: { __typename?: 'Language', id?: string | null } }> };

export type FragmentNodeTestcontentFragment = { __typename?: 'NodeTestContent', testfield?: string | null, body?: { __typename?: 'TextSummary', value?: string | null, processed?: any | null, format?: string | null, summary?: any | null } | null };

export type FragmentArticleTeaserFragment = { __typename: 'NodeArticle', id: string, path: string, title: string, sticky: boolean, excerpt?: string | null, image?: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } | null, created: { __typename?: 'DateTime', timestamp: any }, author?: { __typename: 'User', name: string, mail?: any | null } | null };

type FragmentParagraphUnion_ParagraphAccordion_Fragment = { __typename: 'ParagraphAccordion', id: string, heading?: string | null, accordionLayout: string, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, accordionFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, accordionItems: Array<{ __typename: 'ParagraphAccordionItem', id: string, accordionItemHeading: string, accordionItemFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, contentElements: Array<{ __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }> }> };

type FragmentParagraphUnion_ParagraphAccordionItem_Fragment = { __typename: 'ParagraphAccordionItem', id: string, accordionItemHeading: string, accordionItemFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, contentElements: Array<{ __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }> };

type FragmentParagraphUnion_ParagraphFileAttachment_Fragment = { __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> };

type FragmentParagraphUnion_ParagraphFormattedText_Fragment = { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } };

type FragmentParagraphUnion_ParagraphHero_Fragment = { __typename: 'ParagraphHero', id: string, paragraphHeroHeading: string, formattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } }, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, secondaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null };

type FragmentParagraphUnion_ParagraphImage_Fragment = { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } };

type FragmentParagraphUnion_ParagraphLink_Fragment = { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> };

type FragmentParagraphUnion_ParagraphListingArticle_Fragment = { __typename: 'ParagraphListingArticle', id: string, limit: number, paragraphListingArticleHeading: string };

type FragmentParagraphUnion_ParagraphVideo_Fragment = { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } };

export type FragmentParagraphUnionFragment = FragmentParagraphUnion_ParagraphAccordion_Fragment | FragmentParagraphUnion_ParagraphAccordionItem_Fragment | FragmentParagraphUnion_ParagraphFileAttachment_Fragment | FragmentParagraphUnion_ParagraphFormattedText_Fragment | FragmentParagraphUnion_ParagraphHero_Fragment | FragmentParagraphUnion_ParagraphImage_Fragment | FragmentParagraphUnion_ParagraphLink_Fragment | FragmentParagraphUnion_ParagraphListingArticle_Fragment | FragmentParagraphUnion_ParagraphVideo_Fragment;

export type FragmentParagraphFormattedTextFragment = { __typename?: 'ParagraphFormattedText', formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } };

export type FragmentParagraphLinkFragment = { __typename?: 'ParagraphLink', links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> };

export type FragmentParagraphImageFragment = { __typename?: 'ParagraphImage', image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } };

export type FragmentParagraphVideoFragment = { __typename?: 'ParagraphVideo', video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } };

export type FragmentParagraphFileAttachmentsFragment = { __typename?: 'ParagraphFileAttachment', fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> };

export type FragmentParagraphHeroFragment = { __typename?: 'ParagraphHero', paragraphHeroHeading: string, formattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } }, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, secondaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null };

export type FragmentParagraphAccordionFragment = { __typename?: 'ParagraphAccordion', heading?: string | null, accordionLayout: string, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, accordionFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, accordionItems: Array<{ __typename: 'ParagraphAccordionItem', id: string, accordionItemHeading: string, accordionItemFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, contentElements: Array<{ __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }> }> };

export type FragmentParagraphAccordionItemFragment = { __typename: 'ParagraphAccordionItem', id: string, accordionItemHeading: string, accordionItemFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, contentElements: Array<{ __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }> };

export type FragmentParagraphListingArticleFragment = { __typename: 'ParagraphListingArticle', id: string, limit: number, paragraphListingArticleHeading: string };

export type FragmentUserFragment = { __typename?: 'User', name: string, mail?: any | null };

export type GetNodeByPathQueryVariables = Exact<{
  path: Scalars['String']['input'];
  langcode: Scalars['String']['input'];
}>;


export type GetNodeByPathQuery = { __typename?: 'Query', route?: { __typename: 'RouteExternal' } | { __typename: 'RouteInternal', entity?: { __typename: 'NodeArticle', id: string, title: string, status: boolean, path: string, excerpt?: string | null, sticky: boolean, langcode: { __typename?: 'Language', id?: string | null }, created: { __typename?: 'DateTime', timestamp: any }, changed: { __typename?: 'DateTime', timestamp: any }, metatag: Array<{ __typename?: 'MetaTagLink' } | { __typename?: 'MetaTagProperty' } | { __typename?: 'MetaTagScript' } | { __typename: 'MetaTagValue', tag: string, attributes: { __typename?: 'MetaTagValueAttributes', name?: string | null, content?: string | null } }>, body?: { __typename?: 'TextSummary', value?: string | null, processed?: any | null, format?: string | null, summary?: any | null } | null, image?: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } | null, author?: { __typename: 'User', name: string, mail?: any | null } | null, translations: Array<{ __typename: 'Translation', path?: string | null, langcode: { __typename?: 'Language', id?: string | null } }> } | { __typename: 'NodeFrontpage', id: string, title: string, status: boolean, path: string, langcode: { __typename?: 'Language', id?: string | null }, created: { __typename?: 'DateTime', timestamp: any }, changed: { __typename?: 'DateTime', timestamp: any }, metatag: Array<{ __typename?: 'MetaTagLink' } | { __typename?: 'MetaTagProperty' } | { __typename?: 'MetaTagScript' } | { __typename: 'MetaTagValue', tag: string, attributes: { __typename?: 'MetaTagValueAttributes', name?: string | null, content?: string | null } }>, contentElements: Array<{ __typename: 'ParagraphAccordion', id: string, heading?: string | null, accordionLayout: string, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, accordionFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, accordionItems: Array<{ __typename: 'ParagraphAccordionItem', id: string, accordionItemHeading: string, accordionItemFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, contentElements: Array<{ __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }> }> } | { __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphHero', id: string, paragraphHeroHeading: string, formattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } }, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, secondaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphListingArticle', id: string, limit: number, paragraphListingArticleHeading: string } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }>, translations: Array<{ __typename: 'Translation', path?: string | null, langcode: { __typename?: 'Language', id?: string | null } }> } | { __typename: 'NodePage', id: string, title: string, status: boolean, path: string, langcode: { __typename?: 'Language', id?: string | null }, created: { __typename?: 'DateTime', timestamp: any }, changed: { __typename?: 'DateTime', timestamp: any }, metatag: Array<{ __typename?: 'MetaTagLink' } | { __typename?: 'MetaTagProperty' } | { __typename?: 'MetaTagScript' } | { __typename: 'MetaTagValue', tag: string, attributes: { __typename?: 'MetaTagValueAttributes', name?: string | null, content?: string | null } }>, contentElements: Array<{ __typename: 'ParagraphAccordion', id: string, heading?: string | null, accordionLayout: string, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, accordionFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, accordionItems: Array<{ __typename: 'ParagraphAccordionItem', id: string, accordionItemHeading: string, accordionItemFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, contentElements: Array<{ __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }> }> } | { __typename: 'ParagraphFileAttachment', id: string, fileAttachmentsParagraphHeading?: string | null, fileAttachmentsParagraphFormattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, fileAttachments: Array<{ __typename: 'MediaDocument', id: string, name: string, mediaDocumentFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } }> } | { __typename: 'ParagraphFormattedText', id: string, formattedTextHeading?: string | null, formattedTextText: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } } | { __typename: 'ParagraphHero', id: string, paragraphHeroHeading: string, formattedText?: { __typename?: 'Text', value?: string | null, processed?: any | null, format?: string | null } | null, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } }, primaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null, secondaryLink?: { __typename: 'Link', title?: string | null, url?: string | null, internal: boolean } | null } | { __typename: 'ParagraphImage', id: string, image: { __typename: 'MediaImage', id: string, name: string, mediaImage: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } } } | { __typename: 'ParagraphLink', id: string, links: Array<{ __typename: 'Link', title?: string | null, url?: string | null, internal: boolean }> } | { __typename: 'ParagraphListingArticle', id: string, limit: number, paragraphListingArticleHeading: string } | { __typename: 'ParagraphVideo', id: string, video: { __typename: 'MediaRemoteVideo', id: string, name: string, mediaOembedVideo: string } | { __typename: 'MediaVideo', id: string, name: string, mediaVideoFile: { __typename?: 'File', name?: string | null, url: string, size: number, mime?: string | null, description?: string | null } } }>, translations: Array<{ __typename: 'Translation', path?: string | null, langcode: { __typename?: 'Language', id?: string | null } }> } | { __typename: 'NodeTestContent', id: string, title: string, status: boolean, path: string, testfield?: string | null, langcode: { __typename?: 'Language', id?: string | null }, created: { __typename?: 'DateTime', timestamp: any }, changed: { __typename?: 'DateTime', timestamp: any }, metatag: Array<{ __typename?: 'MetaTagLink' } | { __typename?: 'MetaTagProperty' } | { __typename?: 'MetaTagScript' } | { __typename: 'MetaTagValue', tag: string, attributes: { __typename?: 'MetaTagValueAttributes', name?: string | null, content?: string | null } }>, body?: { __typename?: 'TextSummary', value?: string | null, processed?: any | null, format?: string | null, summary?: any | null } | null } | null } | { __typename: 'RouteRedirect', status: number, url: string, internal: boolean } | null };

export type GetPagesPathsQueryVariables = Exact<{
  number?: InputMaybe<Scalars['Int']['input']>;
  langcode?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPagesPathsQuery = { __typename?: 'Query', nodePages: { __typename?: 'NodePageConnection', nodes: Array<{ __typename?: 'NodePage', path: string }> }, nodeArticles: { __typename?: 'NodeArticleConnection', nodes: Array<{ __typename?: 'NodeArticle', path: string }> } };

export type GetNodePathByIdAndLangcodeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  langcode: Scalars['String']['input'];
}>;


export type GetNodePathByIdAndLangcodeQuery = { __typename?: 'Query', node?: { __typename?: 'NodeArticle', path: string, status: boolean, langcode: { __typename?: 'Language', id?: string | null } } | { __typename?: 'NodeFrontpage', path: string, status: boolean, langcode: { __typename?: 'Language', id?: string | null } } | { __typename?: 'NodePage', path: string, status: boolean, langcode: { __typename?: 'Language', id?: string | null } } | { __typename?: 'NodeTestContent', path: string, status: boolean, langcode: { __typename?: 'Language', id?: string | null } } | null };

export type GetMenuQueryVariables = Exact<{
  name: MenuAvailable;
  langcode: Scalars['String']['input'];
}>;


export type GetMenuQuery = { __typename?: 'Query', menu?: { __typename: 'Menu', items: Array<{ __typename?: 'MenuItem', id: string, description?: string | null, url?: string | null, title: string, internal: boolean, attributes: { __typename?: 'MenuItemAttributes', class?: string | null, icon?: string | null }, langcode: { __typename?: 'Language', id?: string | null }, children: Array<{ __typename?: 'MenuItem', id: string, description?: string | null, url?: string | null, title: string, internal: boolean, attributes: { __typename?: 'MenuItemAttributes', class?: string | null, icon?: string | null }, langcode: { __typename?: 'Language', id?: string | null }, children: Array<{ __typename?: 'MenuItem', id: string, description?: string | null, url?: string | null, title: string, internal: boolean, attributes: { __typename?: 'MenuItemAttributes', class?: string | null, icon?: string | null }, langcode: { __typename?: 'Language', id?: string | null } }> }> }> } | null };

export type ArticleListingQueryVariables = Exact<{
  langcode?: InputMaybe<Scalars['String']['input']>;
  sticky?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ArticleListingQuery = { __typename?: 'Query', articlesView?: { __typename?: 'ArticlesViewResult', results: Array<{ __typename: 'NodeArticle', id: string, path: string, title: string, sticky: boolean, excerpt?: string | null, image?: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null, title?: string | null, size: number, mime?: string | null } | null, created: { __typename?: 'DateTime', timestamp: any }, author?: { __typename: 'User', name: string, mail?: any | null } | null } | { __typename: 'NodeFrontpage' } | { __typename: 'NodePage' } | { __typename: 'NodeTestContent' }>, pageInfo: { __typename?: 'ViewPageInfo', offset: number, page: number, pageSize: number, total: number } } | null };

export const FragmentFormattedTitleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFormattedTitle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]} as unknown as DocumentNode<FragmentFormattedTitleFragment, unknown>;
export const FragmentMetaTagFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMetaTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MetaTagValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<FragmentMetaTagFragment, unknown>;
export const FragmentTextSummaryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentTextSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}}]} as unknown as DocumentNode<FragmentTextSummaryFragment, unknown>;
export const FragmentImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}}]} as unknown as DocumentNode<FragmentImageFragment, unknown>;
export const FragmentUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}}]}}]} as unknown as DocumentNode<FragmentUserFragment, unknown>;
export const FragmentNodeTranslationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeTranslation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Translation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FragmentNodeTranslationFragment, unknown>;
export const FragmentNodeArticleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeArticle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"sticky"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentTextSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentUser"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTranslation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentTextSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeTranslation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Translation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FragmentNodeArticleFragment, unknown>;
export const FragmentTextFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]} as unknown as DocumentNode<FragmentTextFragment, unknown>;
export const FragmentParagraphFormattedTextFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFormattedText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFormattedText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"formattedTextHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"formattedTextText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]} as unknown as DocumentNode<FragmentParagraphFormattedTextFragment, unknown>;
export const FragmentLinkFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}}]} as unknown as DocumentNode<FragmentLinkFragment, unknown>;
export const FragmentParagraphLinkFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}}]} as unknown as DocumentNode<FragmentParagraphLinkFragment, unknown>;
export const FragmentFileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<FragmentFileFragment, unknown>;
export const FragmentMediaAudioFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<FragmentMediaAudioFragment, unknown>;
export const FragmentMediaDocumentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<FragmentMediaDocumentFragment, unknown>;
export const FragmentMediaImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}}]} as unknown as DocumentNode<FragmentMediaImageFragment, unknown>;
export const FragmentMediaRemoteVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}}]} as unknown as DocumentNode<FragmentMediaRemoteVideoFragment, unknown>;
export const FragmentMediaVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<FragmentMediaVideoFragment, unknown>;
export const FragmentMediaUnionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}}]} as unknown as DocumentNode<FragmentMediaUnionFragment, unknown>;
export const FragmentParagraphImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}}]} as unknown as DocumentNode<FragmentParagraphImageFragment, unknown>;
export const FragmentParagraphVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}}]} as unknown as DocumentNode<FragmentParagraphVideoFragment, unknown>;
export const FragmentParagraphFileAttachmentsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFileAttachment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fileAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}}]} as unknown as DocumentNode<FragmentParagraphFileAttachmentsFragment, unknown>;
export const FragmentParagraphHeroFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphHeroHeading"},"name":{"kind":"Name","value":"heading"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}}]} as unknown as DocumentNode<FragmentParagraphHeroFragment, unknown>;
export const FragmentParagraphAccordionItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItemContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFormattedText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFormattedText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"formattedTextHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"formattedTextText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFileAttachment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fileAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}}]} as unknown as DocumentNode<FragmentParagraphAccordionItemFragment, unknown>;
export const FragmentParagraphAccordionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"accordionLayout"}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"accordionFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accordionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFormattedText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFormattedText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"formattedTextHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"formattedTextText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFileAttachment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fileAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItemContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FragmentParagraphAccordionFragment, unknown>;
export const FragmentParagraphListingArticleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphListingArticle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphListingArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphListingArticleHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]} as unknown as DocumentNode<FragmentParagraphListingArticleFragment, unknown>;
export const FragmentNodeFrontpageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeFrontpage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeFrontpage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeFrontpageContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordion"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphListingArticle"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTranslation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFormattedText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFormattedText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"formattedTextHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"formattedTextText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFileAttachment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fileAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItemContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphHeroHeading"},"name":{"kind":"Name","value":"heading"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"accordionLayout"}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"accordionFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accordionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphListingArticle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphListingArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphListingArticleHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeTranslation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Translation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FragmentNodeFrontpageFragment, unknown>;
export const FragmentNodePageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodePage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodePageContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordion"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphListingArticle"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordion"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTranslation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFormattedText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFormattedText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"formattedTextHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"formattedTextText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFileAttachment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fileAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItemContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphHeroHeading"},"name":{"kind":"Name","value":"heading"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"accordionLayout"}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"accordionFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accordionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphListingArticle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphListingArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphListingArticleHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeTranslation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Translation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FragmentNodePageFragment, unknown>;
export const FragmentNodeTestcontentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeTestcontent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeTestContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentTextSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"testfield"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentTextSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}}]} as unknown as DocumentNode<FragmentNodeTestcontentFragment, unknown>;
export const FragmentNodeUnionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"changed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metatag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMetaTag"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeArticle"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeFrontpage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodePage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTestcontent"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentTextSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeTranslation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Translation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFormattedText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFormattedText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"formattedTextHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"formattedTextText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFileAttachment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fileAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphHeroHeading"},"name":{"kind":"Name","value":"heading"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItemContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"accordionLayout"}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"accordionFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accordionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphListingArticle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphListingArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphListingArticleHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMetaTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MetaTagValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeArticle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"sticky"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentTextSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentUser"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTranslation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeFrontpage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeFrontpage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeFrontpageContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordion"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphListingArticle"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTranslation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodePage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodePageContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordion"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphListingArticle"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordion"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTranslation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeTestcontent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeTestContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentTextSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"testfield"}}]}}]} as unknown as DocumentNode<FragmentNodeUnionFragment, unknown>;
export const FragmentArticleTeaserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentArticleTeaser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sticky"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"created"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentUser"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}}]}}]} as unknown as DocumentNode<FragmentArticleTeaserFragment, unknown>;
export const FragmentParagraphUnionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordion"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphListingArticle"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFormattedText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFormattedText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"formattedTextHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"formattedTextText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFileAttachment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fileAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItemContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphHeroHeading"},"name":{"kind":"Name","value":"heading"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"accordionLayout"}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"accordionFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accordionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphListingArticle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphListingArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphListingArticleHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]} as unknown as DocumentNode<FragmentParagraphUnionFragment, unknown>;
export const GetNodeByPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNodeByPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}},{"kind":"Argument","name":{"kind":"Name","value":"langcode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RouteInternal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"entity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeUnion"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RouteRedirect"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMetaTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MetaTagValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentTextSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeTranslation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Translation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeArticle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"sticky"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentTextSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentUser"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTranslation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFormattedText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFormattedText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"formattedTextHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"formattedTextText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaAudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaAudio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaAudioFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaDocument"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"mediaDocumentFile"},"name":{"kind":"Name","value":"mediaDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaRemoteVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaOembedVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mediaVideoFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentFile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentMediaUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaAudio"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaDocument"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaRemoteVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphFileAttachment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"fileAttachmentsParagraphFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fileAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMediaUnion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphHeroHeading"},"name":{"kind":"Name","value":"heading"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","alias":{"kind":"Name","value":"accordionItemFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordionItemContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphAccordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"accordionLayout"}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"accordionFormattedText"},"name":{"kind":"Name","value":"formattedText"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accordionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordionItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentParagraphListingArticle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphListingArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"paragraphListingArticleHeading"},"name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeFrontpage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeFrontpage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeFrontpageContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordion"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphListingArticle"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTranslation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodePage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParagraphInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodePageContentElementsUnion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFormattedText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphLink"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphImage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphFileAttachments"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordion"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphListingArticle"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentParagraphAccordion"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTranslation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeTestcontent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeTestContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentTextSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"testfield"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentNodeUnion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"changed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metatag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentMetaTag"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeArticle"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeFrontpage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodePage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentNodeTestcontent"}}]}}]} as unknown as DocumentNode<GetNodeByPathQuery, GetNodeByPathQueryVariables>;
export const GetPagesPathsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPagesPaths"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"number"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodePages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"number"}}},{"kind":"Argument","name":{"kind":"Name","value":"langcode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortKey"},"value":{"kind":"EnumValue","value":"UPDATED_AT"}},{"kind":"Argument","name":{"kind":"Name","value":"reverse"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodeArticles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"number"}}},{"kind":"Argument","name":{"kind":"Name","value":"langcode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortKey"},"value":{"kind":"EnumValue","value":"UPDATED_AT"}},{"kind":"Argument","name":{"kind":"Name","value":"reverse"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<GetPagesPathsQuery, GetPagesPathsQueryVariables>;
export const GetNodePathByIdAndLangcodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNodePathByIdAndLangcode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"langcode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetNodePathByIdAndLangcodeQuery, GetNodePathByIdAndLangcodeQueryVariables>;
export const GetMenuDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMenu"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MenuAvailable"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"menu"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"langcode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"langcode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMenuQuery, GetMenuQueryVariables>;
export const ArticleListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArticleListing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"en","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sticky"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articlesView"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"langcode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langcode"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sticky"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sticky"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentArticleTeaser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FragmentArticleTeaser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sticky"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"created"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FragmentUser"}}]}}]}}]}}]} as unknown as DocumentNode<ArticleListingQuery, ArticleListingQueryVariables>;