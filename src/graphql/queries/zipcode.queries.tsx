import { gql } from '@apollo/client';

export interface ZipCode {
  id: string;
  name: string;
}

export interface ZipCodeGraphQLQueries {
  loading: boolean;
  error?: any;
  getAllZipCodes: () => Promise<ZipCode[]>;
  getZipCode: (zipCode: string) => Promise<ZipCode>;
}

export const QUERY_GET_ALL_ZIP_CODES = gql`
  query {
    getAllZipCodes {
      id
      name
    }
  }
`;

export const QUERY_GET_ZIP_CODE = gql`
  query getZipCode($zipCode : String!) {
    getZipCode(id: $zipCode) {
      id
      name
    }
  }
`;
