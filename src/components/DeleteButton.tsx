import { Config } from "../Config"
import useDelete from "../hooks/useDelete"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function DeleteButton (props: {locationBase: string, location: string}) {

    const url: string = Config.API_URL + props.locationBase + props.location;
    const {status, error, handleDelete} = useDelete(url)
    const nav = useNavigate();
    useEffect(() => {
        if (status === 204) {
          alert('Delete successful');
          nav('/actors');
        }
      }, [status, nav]);
    

    return (
        <section>
            <button onClick={handleDelete}>Delete</button>
        </section>
    )
}