import { getAllPeople } from '../graphql/graphql.queries';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/material/styles';
import { Box, Card, List, ListItem } from '@mui/material';

const SearchCard = styled(Card)`
  margin: 16px;
`;

const SearchContainer = styled(Box)`
  padding: 16px;
`;

const ItemLabel = styled(ListItem)`
  padding-left: 16px;
`;

const SearchPage: FunctionComponent = () => {
  const { register, handleSubmit } = useForm();
  const { data, loading, error } = useQuery(getAllPeople);

  const onSubmit = (data: any) => console.log(data);

  if (loading) return <pre>Loading...</pre>;
  if (error) return <pre>{error.message}</pre>;

  return (
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
        {data.getAllPeople && data.getAllPeople.map((zipCode: any) => (
          <ItemLabel key={zipCode.id}>{zipCode.name}</ItemLabel>
        ))}
      </List>
    </>
  );
};

export default SearchPage;
