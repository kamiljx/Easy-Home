export interface Announcement{
    id: number;
    realEstateId: number;
    title: string;
    description: string;
    label: string; // warning, success, info, primary, danger
}