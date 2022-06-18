import { gql } from "@apollo/client";

const getAllPeopleQuery = gql`
  query {
    getAllPeople {
      id
      name
    }
  }
`;

export { getAllPeopleQuery };
