import { Employee } from './Employee';
export class Asset {
  assetId: number;
  assetName: string;
  assetDescription: string;
  availability: string;
  allottedTo: Employee;
  assetCategory: string;
}
