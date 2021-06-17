import { Photo } from "./photo";

export interface Member {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
    age: string;
    created: Date;
    lastActive: Date;
    dateOfBirth: Date;
    gender: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    realEstateCount: number; 
    photos: Photo[]
}
