import { Link, useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import Actor from "../interfaces/Actor";
import { Config } from "../Config";
import DeleteButton from "./DeleteButton";

export default function ActorDetail () {
    const {actorId} = useParams();
    const { data: actor, loading, error } = useFetch<Actor>(Config.API_URL + "/actors/" + actorId);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: error</p>;
    if (actor === undefined || actor === null) {
        return <p>Somehow actor was null/undefined. Very sad.</p>
    }

    const filmLinks = actor.films.map(f => <Link to={"/films/" + f.id} key={f.id}>{f.title}</Link>)
    return (
        <div className="coolBoxRed wideFixedBox">
            <h1>{actor.firstName + " " + actor.lastName}</h1>
            <h2>Films</h2>
            <ul className="cast-list">
                {filmLinks}
            </ul>
            <DeleteButton locationBase={"/actors"} location={"/" + actorId}/>
        </div>
    )
}
