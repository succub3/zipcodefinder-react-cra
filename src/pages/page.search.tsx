import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Box, Card, List, ListItem } from '@mui/material';
import useZipCode from '../graphql/hooks/useZipCode.hook';
import { ZipCode } from '../graphql/queries/zipcode.queries';

const SearchCard = styled(Card)`
  margin: 16px;
`;

const SearchContainer = styled(Box)`
  padding: 16px;
`;

const StyledListItem = styled(ListItem)`
  padding-left: 16px;
`;

const SearchPage: FunctionComponent = () => {
  const { register, handleSubmit } = useForm();
  const { loading, error, getAllZipCodes } = useZipCode();

  const [zipCodes, setZipCodes] = useState<ZipCode[]>([]);

  const onSubmit = (data: any) => console.log(data);

  useEffect(() => {
    async function fetchAllZipCodes() {
      const zipCodes = await getAllZipCodes();
      setZipCodes(zipCodes);
    }

    fetchAllZipCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? <pre>Loading...</pre> : error ? <pre>{error.message}</pre> : (
    <>
      <SearchCard>
        <SearchContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue="test" {...register('name')} />
            <input type="submit"/>
          </form>
        </SearchContainer>
      </SearchCard>
      <List>
        {zipCodes && zipCodes.map((zipCode: ZipCode) => (
          <StyledListItem key={zipCode.id}>{zipCode.name}</StyledListItem>
        ))}
      </List>
    </>
  );
};

export default SearchPage;
