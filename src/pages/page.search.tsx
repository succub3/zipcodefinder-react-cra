import { FunctionComponent, SyntheticEvent, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import { Card, TextField, Grid, Button, Autocomplete } from "@mui/material";
import useZipCodeFinder from "../graphql/hooks/useZipCodeFinder.hook";
import { ZipCodeInfo } from "../graphql/queries/zipcode.queries";
// @ts-ignore
import countryList from "react-select-country-list";

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

interface CountryOption {
  label: string;
  value: string;
}

const SearchPage: FunctionComponent = () => {
  const { loading, error, getZipCodeInfo } = useZipCodeFinder();

  const countryOptions = useMemo(() => countryList().getData(), []);
  const countryOptionUS = countryOptions[236];
  const [countryOption, setCountryOption] = useState<CountryOption | null>(countryOptionUS);
  const [postalCode, setPostalCode] = useState<string>("");
  const [zipCodeInfo, setZipCodeInfo] = useState<ZipCodeInfo>();

  const handleSearch = async () => {
    const zipCodeInfo = await getZipCodeInfo(countryOption?.value ?? "", postalCode);
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
          <Grid container>
            <Grid item>
              <Autocomplete
                disablePortal
                size="small"
                getOptionLabel={(option: any) => option.label}
                options={countryOptions}
                sx={{ width: 300 }}
                renderInput={(params) => {
                  return <CountryCodeTextField {...params} label="Country"/>}
                }
                value={countryOption}
                onChange={(_event: SyntheticEvent<Element, Event>, value: CountryOption | null): void => {
                  setCountryOption(value);
                }}
              />
            </Grid>
            <Grid item>
              <PostalCodeTextField
                size="small"
                label="Zip Code"
                inputProps={{ maxLength: 8 }}
                value={postalCode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setPostalCode(event.target.value)}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="outlined" onClick={handleSearch}>Search</Button>
            </Grid>
          </Grid>
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
