import { Link } from "react-router-dom";

export default function ErrorPage() {
    return <>
        <article className="coolBoxRed errorPage">
            <h1>Oopsy something went wrong</h1>
            <h2>The page could not be found</h2>
            <Link to="/">GO HOME</Link>
        </article>
    </>
}