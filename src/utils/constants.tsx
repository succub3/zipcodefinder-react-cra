import { gql } from "graphql-request";

const getAllPeopleQuery = gql`
  query {
    getAllPeople {
      id
      name
    }
  }
`;

export { getAllPeopleQuery };
