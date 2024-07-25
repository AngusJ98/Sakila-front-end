import PartialFilm from "./PartialFilm";

export default interface Actor {
    id: number;
    firstName: string;
    lastName: string;
    films: PartialFilm[];
}