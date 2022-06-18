import { QUERY_GET_ALL_ZIP_CODES, QUERY_GET_ZIP_CODE, ZipCode, ZipCodeGraphQLQueries } from '../queries/zipcode.queries';
import { useLazyQuery } from '@apollo/client';

export default function useZipCode(): ZipCodeGraphQLQueries {

  const [
    queryGetAllZipCodes,
    { data: getAllZipCodesData, loading: getAllZipCodesLoading, error: getAllZipCodesError }
  ] = useLazyQuery(QUERY_GET_ALL_ZIP_CODES, {
    onError: (error) => {
      /* no-op */
    },
  });

  const getAllZipCodes = async (): Promise<ZipCode[]> => {
    const { data } = await queryGetAllZipCodes();
    return data.getAllZipCodes;
  };

  const [
    queryGetZipCode,
    { data: getZipCodeData, loading: getZipCodeLoading, error: getZipCodeError }
  ] = useLazyQuery(QUERY_GET_ZIP_CODE, {
    onError: (error) => {
      /* don't throw any error */
    },
  });

  const getZipCode = async (zipCode: string): Promise<ZipCode> => {
    const { data } = await queryGetZipCode({ variables: { id: zipCode } });
    return data.getZipCode;
  };

  return {
    loading: getAllZipCodesLoading || getZipCodeLoading,
    error: getAllZipCodesError ?? getZipCodeError,
    getAllZipCodes,
    getZipCode,
  };
}
