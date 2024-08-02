import { useState, useEffect, FormEvent } from "react"
import usePost from "../hooks/usePost";
import { Config } from "../Config";

import { useNavigate } from "react-router-dom";

interface ActorInput {
    firstName: string;
    lastName: string;
}
export default function ActorForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const url: string = Config.API_URL + "/actors";
    const {status, handlePost} = usePost<ActorInput>(url)
    const nav = useNavigate();
    useEffect(() => {
        if (status === 201) {
          alert("Post successful");
          nav("/actors");
        }
      }, [status, nav]);
    function handleFirstNameChange(name:string) {
        setFirstName(name)
    }
    function handleLastNameChange(name:string) {
        setLastName(name)
    }
    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const data = {firstName: firstName, lastName: lastName}
        handlePost(data);
        console.log(status)
    }
    return (
        <article className="coolBoxRed wideFixedBox">
            <h2>New Actor?</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <p>
                    <label>
                    First Name:
                        <input 
                            type="text" 
                            value={firstName} 
                            onChange={e => handleFirstNameChange(e.target.value)} 
                        />
                    </label>
                </p>

                <p>
                    <label>
                        Last Name:
                        <input 
                            type="text" 
                            value={lastName} 
                            onChange={e => handleLastNameChange(e.target.value)} 
                        />
                    </label>
                </p>

                <button type="submit">Submit!</button>
            </form>
        </article>
    )
}