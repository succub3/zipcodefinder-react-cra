import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Card, TextField, Grid, Button } from '@mui/material';
import useZipCodeFinder from '../graphql/hooks/useZipCodeFinder.hook';
import { ZipCodeInfo } from '../graphql/queries/zipcode.queries';

const CountryCodeTextField = styled(TextField)`
  padding-right: 16px;
`;

const PostalCodeTextField = styled(TextField)`
  padding-right: 16px;
`;

const RowGrid = styled(Grid)`
  padding-left: 16px;
`;

const LabelGrid = styled(Grid)`
  font-weight: bold;
  padding-right: 4px;
`;

const ValueGrid = styled(Grid)`
  padding-right: 8px;
`;

const SearchCard = styled(Card)`
  padding: 16px;
`;

const ContainerGrid = styled(Grid)`
  padding-top: 16px;
`;

const ErrorGrid = styled(Grid)`
  color: red;
`;

const SearchPage: FunctionComponent = () => {
  const { register, handleSubmit } = useForm();
  const { loading, error, getZipCodeInfo } = useZipCodeFinder();

  const [zipCodeInfo, setZipCodeInfo] = useState<ZipCodeInfo>();

  const onSubmit = async (data: any) => {
    const zipCodeInfo = await getZipCodeInfo(data.countryCode, data.postalCode);
    setZipCodeInfo(zipCodeInfo);
  };

  return loading ? <pre>Loading...</pre> : (
    <ContainerGrid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <SearchCard>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CountryCodeTextField
              size="small"
              label="Country Code"
              inputProps={{ maxLength: 2 }}
              {...register("countryCode")}
            />
            <PostalCodeTextField
              size="small"
              label="Postal Code"
              inputProps={{ maxLength: 8 }}
              {...register("postalCode")}
            />
            <Button type="submit" variant="outlined">Search</Button>
          </form>
        </SearchCard>
      </Grid>
      { error && <ErrorGrid item>Invalid entries</ErrorGrid> }
      { zipCodeInfo &&
        <Grid item>
          <RowGrid container>
            <LabelGrid item>Country:</LabelGrid>
            <ValueGrid item>{`${zipCodeInfo.country} (${zipCodeInfo.countryCode})`}</ValueGrid>
          </RowGrid>
          <RowGrid container>
              <LabelGrid item>Zip Code:</LabelGrid>
              <ValueGrid item>{zipCodeInfo.zipCode}</ValueGrid>
          </RowGrid>
          <RowGrid container>
            { zipCodeInfo.locations && zipCodeInfo.locations.map((location) =>
              <Grid item key={`${location.latitude}, ${location.longitude}`}>
                <Grid container>
                  <LabelGrid item>Location:</LabelGrid>
                  <ValueGrid item>{location.locationName}</ValueGrid>
                </Grid>
                <Grid container>
                  <LabelGrid item>State:</LabelGrid>
                  <ValueGrid item>{`${location.state} (${location.stateCode})`}</ValueGrid>
                </Grid>
                <Grid container>
                  <LabelGrid item>Latitude:</LabelGrid>
                  <ValueGrid item>{location.latitude}</ValueGrid>
                </Grid>
                <Grid container>
                  <LabelGrid item>Longitude:</LabelGrid>
                  <ValueGrid item>{location.longitude}</ValueGrid>
                </Grid>
              </Grid>
            )}
          </RowGrid>
        </Grid>
      }
    </ContainerGrid>
  );
};

export default SearchPage;
