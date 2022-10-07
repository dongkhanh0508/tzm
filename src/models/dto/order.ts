import { PaginationRequest } from 'models';

export interface Order {
  id: number;
  fromStationId: number;
  toStationId: number;
  batchId: number;
  createdAt: Date;
  updatedAt: Date;
  orderCode: string;
  orderInfo: string;
  status: number;
  packageItems: PackageItem[];
  fromStation: Station;
  toStation: Station;
  orderInfoObj: OrderInfo;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface Station {
  id: number;
  code: string;
  stationName: string;
  longitude: number;
  latitude: number;
  address: string;
  district: string;
  ward: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface PackageItem {
  id: number;
  quantity: number;
  description: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  itemInfo: string;
  itemInfoObj: ItemInfo;
}
export interface OrderInfo {
  cod: number;
  totalPriceOrder: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  note: string;
  incurred: number;
  serviceCharge: number;
}
export interface ItemInfo {
  img: string;
  name: string;
}
export interface OrderOptions {
  id: number;
  name: string;
}
export interface OrderPagingRequest extends PaginationRequest {
  status?: number;
}
export interface OrderReport {
  dates: string[];
  data: Data[];
}

export interface Data {
  status: string;
  value: number[];
}
export interface FilterReport {
  year?: number;
  month?: number;
}
