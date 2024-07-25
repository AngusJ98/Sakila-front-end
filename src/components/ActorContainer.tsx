import useFetch from "../hooks/useFetch";
import ActorInstance from "./ActorInstance";
import Actor from "../interfaces/Actor";

export default function ActorContainer () {
    const { data: actors, loading, error } = useFetch<Actor[]>("http://localhost:8080/actors");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: error</p>;

    const actorList = actors!.map(actor => (
        <ActorInstance id={actor.id} firstName={actor.firstName} lastName={actor.lastName} films={actor.films} key={actor.id} />
    ))

    return (
        <>
            <section className="actorList">
                <h1>List of all actors</h1>

                <ul className="actorContainerList">
                    {actorList}
                </ul>
            </section>
        </>
    )
}