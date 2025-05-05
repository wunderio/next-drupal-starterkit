import { graphql } from "@/lib/gql";

export const FRAGMENT_USER = graphql(`
  fragment FragmentUser on User {
    name
    mail
  }
`);
