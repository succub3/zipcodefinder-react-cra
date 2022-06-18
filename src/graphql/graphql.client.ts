import { DEFAULT_API_URL } from '../utils/constants';
import { ApolloClient, InMemoryCache } from "@apollo/client";

const GraphqlClient = new ApolloClient({
    uri: process.env.API_URL ?? DEFAULT_API_URL,
    cache: new InMemoryCache()
});

export default GraphqlClient;
