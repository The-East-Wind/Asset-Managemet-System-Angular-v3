import { Employee } from './Employee';
import { Asset } from './Asset';
export class Request {
  requestId: number;
  requestedFrom: string;
  requestedTill: string;
  status: string;
  requestedBy: Employee;
  requestedFor: Employee;
  requestedAsset: Asset;
}
