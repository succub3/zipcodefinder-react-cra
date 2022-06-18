import { gql } from '@apollo/client';

const getAllPeople = gql`
  query {
    getAllPeople {
      id
      name
    }
  }
`;

export { getAllPeople };
