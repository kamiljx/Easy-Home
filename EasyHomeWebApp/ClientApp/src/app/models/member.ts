import { Photo } from "./photo";

export interface Member {
    id: number;
    email: string;
    photoUrl: string;
    age: string;
    created: Date;
    lastActive: Date;
    gender: string;
    city: string;
    country: string;
    realEstateCount: number; 
    photos: Photo[]
}
