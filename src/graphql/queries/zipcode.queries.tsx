import { gql } from "@apollo/client";

export interface ZipCodeInfo {
  zipCode: string;
  country: string;
  countryCode: string;
  locations: Location[];
}

export interface Location {
  locationName: string;
  longitude: string;
  state: string;
  stateCode: string;
  latitude: string;
}

export interface ZipCodeFinderGraphQLQueries {
  loading: boolean;
  error?: any;
  getZipCodeInfo: (countryCode: string, postalCode: string) => Promise<ZipCodeInfo>;
}

export const QUERY_GET_ZIP_CODE_INFO = gql`
  query GetZipCodeInfo($countryCode: String!, $postalCode: String!) {
    getZipCodeInfo(countryCode: $countryCode, postalCode: $postalCode) {
      zipCode
      countryCode
      country
      locations {
        locationName
        stateCode
        state
        longitude
        latitude
      }
    }
  }
`;
