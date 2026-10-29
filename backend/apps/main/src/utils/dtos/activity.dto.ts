import { ActivityType } from 'src/databases/mongo/enums/activity-type.enum';

export class ActivityInputDto {
  leadID: any;
  type: ActivityType;
  description: string;
  metadata: object;
  createdBy: string;
}
