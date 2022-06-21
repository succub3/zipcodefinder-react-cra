import { QUERY_GET_ZIP_CODE_INFO, ZipCodeInfo, ZipCodeFinderGraphQLQueries } from "../queries/zipcode.queries";
import { useLazyQuery } from "@apollo/client";

export default function useZipCodeFinder(): ZipCodeFinderGraphQLQueries {

  const [
    queryGetZipCodeInfo,
    { /*data: getZipCodeInfoData,*/ loading: getZipCodeInfoLoading, error: getZipCodeInfoError }
  ] = useLazyQuery(QUERY_GET_ZIP_CODE_INFO, {
    onError: (error) => {
      /* don't throw any error */
    },
  });

  const getZipCodeInfo = async (countryCode: string, postalCode: string): Promise<ZipCodeInfo> => {
    const { data } = await queryGetZipCodeInfo({ variables: { countryCode, postalCode } });
    return data ? data.getZipCodeInfo : undefined;
  };

  return {
    loading: getZipCodeInfoLoading,
    error: getZipCodeInfoError,
    getZipCodeInfo,
  };
}
