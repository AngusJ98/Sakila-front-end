import { useState } from "react"
import { FormEvent } from "react";
import usePost from "../hooks/usePost";
import { Config } from "../Config";
export default function ActorForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    function handleFirstNameChange(name:string) {
        setFirstName(name)
    }
    function handleLastNameChange(name:string) {
        setLastName(name)
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const actor = { firstName, lastName };
        usePost(Config.API_URL + "/actors", actor)
    }

    return (
        <article className="coolBoxRed wideFixedBox">
            <label>
              First Name:
              <input 
                type="text" 
                value={firstName} 
                onChange={e => handleFirstNameChange(e.target.value)} 
              />
            </label>

            <label>
              Last Name:
              <input 
                type="text" 
                value={lastName} 
                onChange={e => handleLastNameChange(e.target.value)} 
              />
            </label>

            <button type="submit">Submit!</button>
        </article>
    )
}