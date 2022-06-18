import { getAllPeopleQuery } from "../graphql/graphql.queries";
import { FunctionComponent } from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";

// const { register, handleSubmit } = useForm();
// const onSubmit = (data: any) => console.log(data);

const SearchPage: FunctionComponent = () => {
    const { data, loading, error } = useQuery(getAllPeopleQuery);

    if (loading) return <pre>Loading...</pre>;
    if (error) return <pre>{error.message}</pre>

    return (
        <div>
            <div>
                { data.getAllPeople && data.getAllPeople.map((zipCode: any) => (
                    <p key={zipCode.id}>{zipCode.name}</p>
                ))}
            </div>
            {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    <input defaultValue="test" {...register("name")} />*/}
            {/*    <input type="submit" />*/}
            {/*</form>*/}
        </div>
    );
};

export default SearchPage;
