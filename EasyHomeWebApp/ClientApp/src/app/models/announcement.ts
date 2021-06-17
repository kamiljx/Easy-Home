export interface Announcement{
    id: number;
    realEstateId: number;
    title: string;
    description: string;
    type: string; // warning, success, info, primary, danger
    date: string;

}