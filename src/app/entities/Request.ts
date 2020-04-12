import { Asset } from './Asset';
export class Request {
  requestId: number;
  fromDate: string;
  toDate: string;
  status: string;
  requestedBy: object;
  requestedFor: object;
  requestedAsset: Asset;
}
