import { Link } from 'react-router-dom'
import PartialFilm from '../interfaces/PartialFilm'



export default function ActorInstance (props:{id: number, firstName: string, lastName: string, films: PartialFilm[]}) {
    return (
        <Link to={"/actors/" + props.id} className="coolBoxRed fixedBox" >
            <div className="">
                <h3 className="">{props.firstName + " " + props.lastName} </h3>
            </div>
        </Link>
    )
}

