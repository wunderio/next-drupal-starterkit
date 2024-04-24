import { graphql } from "gql.tada";

export const FRAGMENT_USER = graphql(`
  fragment FragmentUser on User {
    name
    mail
  }
`);
