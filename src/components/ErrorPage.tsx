import { Link } from "react-router-dom";

export default function ErrorPage() {
    return <>
        <h1>Oopsy something went wrong</h1>
        <Link to="/">GO HOME</Link>
    </>
}