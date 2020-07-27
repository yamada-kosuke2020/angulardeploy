import { Employee } from './employee';

export class Schedule {
    id: string;
    subject: string;
    startDate: string;
    endDate: string;
    creatorName: string;
    updaterName: string;
    attendees: Array<Employee>;
    eventMenu: string;
    createdAt: string;
    updatedAt: string;
    memo: string;
}