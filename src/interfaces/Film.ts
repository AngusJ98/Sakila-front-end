import Actor from "./actor";

export default interface Film {
    id: number;
    title: string;
    releaseYear: number;
    language: {
        id: number;
        name: string;
    }
    cast: Actor[];
    description:string;
    rentalDuration: number;
    rentalRate:number;
    length:number;
    replacementCost:number;
    rating:"G"|"PG_13"|"PG"|"R"|"NC_17";
    specialFeatures:string[];
}