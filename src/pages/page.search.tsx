import { FunctionComponent, SyntheticEvent, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import { Card, TextField, Grid, Button, Autocomplete } from "@mui/material";
import useZipCodeFinder from "../graphql/hooks/useZipCodeFinder.hook";
import { ZipCodeInfo } from "../graphql/queries/zipcode.queries";
// @ts-ignore
import countryList from "react-select-country-list";

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

const PaddedCard = styled(Card)`
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
  const [zipCodeInfoHistory, setZipCodeInfoHistory] = useState<ZipCodeInfo[]>([]);

  const handleSearch = async () => {
    const zipCodeInfo = await getZipCodeInfo(countryOption?.value ?? "", postalCode);
    if (zipCodeInfo) {
      setZipCodeInfoHistory([zipCodeInfo, ...zipCodeInfoHistory].slice(0, 5));
    }
  };

  const handleClear = () => {
    setZipCodeInfoHistory([]);
  }

  return loading ? <pre>Loading...</pre> : (
    <ContainerGrid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <PaddedCard>
          <Grid container>
            <Grid item>
              <Autocomplete
                disablePortal
                size="small"
                getOptionLabel={(option: any) => option.label}
                options={countryOptions}
                sx={{ width: 300, paddingRight: "16px" }}
                renderInput={(params) => {
                  return <TextField {...params} label="Country"/>}
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
            <Grid item sx={{ paddingRight: "16px" }}>
              <Button type="submit" variant="outlined" onClick={handleSearch}>Search</Button>
            </Grid>
            <Grid item sx={{ paddingRight: "16px" }}>
              <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
            </Grid>
          </Grid>
        </PaddedCard>
      </Grid>
      { error && <ErrorGrid item>Invalid entries</ErrorGrid> }
      { zipCodeInfoHistory && zipCodeInfoHistory.map((zipCodeInfo, index) =>
        <Grid item key={`zipCode: ${zipCodeInfo.zipCode}`}>
          <PaddedCard>
            <Grid container>
              <Grid item>
                <RowGrid container>
                  { zipCodeInfo?.locations && zipCodeInfo.locations.map((location) =>
                    <Grid item key={`lat-long: ${location.latitude}, ${location.longitude}`}>
                      <Grid container>
                        <LabelGrid item sx={{ color: index ? "#CCC" : "black" }}>City:</LabelGrid>
                        <ValueGrid item sx={{ color: index ? "#CCC" : "black" }}>{location.locationName}</ValueGrid>
                      </Grid>
                      <Grid container>
                        <LabelGrid item sx={{ color: index ? "#CCC" : "black" }}>State:</LabelGrid>
                        <ValueGrid item sx={{ color: index ? "#CCC" : "black" }}>
                          {`${location.state} (${location.stateCode})`}
                        </ValueGrid>
                      </Grid>
                    </Grid>
                  )}
                </RowGrid>
              </Grid>
            </Grid>
          </PaddedCard>
        </Grid>
      )}
    </ContainerGrid>
  );
};

export default SearchPage;
