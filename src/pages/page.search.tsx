import { getAllPeople } from '../graphql/graphql.queries';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/material/styles';
import { List, ListItem } from '@mui/material';

const ItemLabel = styled(ListItem)`
`;

const SearchPage: FunctionComponent = () => {
  const { register, handleSubmit } = useForm();
  const { data, loading, error } = useQuery(getAllPeople);

  const onSubmit = (data: any) => console.log(data);

  if (loading) return <pre>Loading...</pre>;
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <List>
        {data.getAllPeople && data.getAllPeople.map((zipCode: any) => (
          <ItemLabel key={zipCode.id}>{zipCode.name}</ItemLabel>
        ))}
      </List>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="test" {...register('name')} />
        <input type="submit"/>
      </form>
    </>
  );
};

export default SearchPage;
