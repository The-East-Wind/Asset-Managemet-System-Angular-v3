import { Employee } from './Employee';
import { Asset } from './Asset';
export class Request {
  requestId: number;
  fromDate: string;
  toDate: string;
  status: string;
  requestedBy: Employee;
  requestedFor: Employee;
  requestedAsset: Asset;
}
