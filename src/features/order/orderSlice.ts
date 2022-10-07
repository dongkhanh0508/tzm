import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { FilterReport, Order, OrderPagingRequest, OrderReport, Response } from 'models';
import { toast } from 'react-toastify';
import i18n from 'translation/i18n';

export interface TaskState {
  loading: boolean;
  orders: Response<Order>;
  filter: OrderPagingRequest;
  report: OrderReport;
  filterReport: FilterReport;
}
export interface Report {
  totalDelivered: number[];
  totalCancel: number[];
  total: number[];
  labels: string[];
}
const initialState: TaskState = {
  loading: false,
  filter: {
    page: 1,
    pageSize: 10,
  },
  orders: {
    pageNumber: 1,
    pageSize: 10,
    results: [],
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
  },
  report: {
    dates: [],
    data: [],
  },
  filterReport: {
    year: new Date().getFullYear(),
    month: 0,
  },
};
const orderSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // poi brands
    fetchOrderList(state, action: PayloadAction<OrderPagingRequest>) {
      state.loading = true;
    },
    fetchOrderListSuccess(state, action: PayloadAction<Response<Order>>) {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrderListError(state) {
      toast.error(i18n.t('common.errorText'));
      state.loading = false;
    },
    // filter
    setFilter(state, action: PayloadAction<OrderPagingRequest>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<OrderPagingRequest>) {
      console.log('');
    },
    // report
    fetchOrderReport(state, action: PayloadAction<FilterReport>) {
      state.loading = true;
    },
    fetchOrderReportSuccess(state, action: PayloadAction<OrderReport>) {
      state.report = action.payload;
      state.loading = false;
    },
    fetchOrderReportError(state) {
      toast.error(i18n.t('common.errorText'));
      state.loading = false;
    },
    // filter
    setFilterOrderReport(state, action: PayloadAction<FilterReport>) {
      state.filterReport = action.payload;
    },
  },
});
// actions
export const orderActions = orderSlice.actions;
// selectors
export const selectLoading = (state: RootState) => state.order.loading;
export const selectOrderList = (state: RootState) => state.order.orders;
export const selectOrderOptions = createSelector(selectOrderList, (orders) =>
  orders?.results?.map((order) => ({
    name: order.orderCode,
    id: order.id,
  }))
);
export const selectFilter = (state: RootState) => state.order.filter;
// report
export const selectFilterReport = (state: RootState) => state.order.filterReport;
export const selectOrderReport = (state: RootState) => state.order.report;
export const selectReport = createSelector(
  selectOrderReport,
  (orders) =>
    ({
      labels: orders?.dates || [],
      total: orders?.data[2]?.value || [],
      totalCancel: orders?.data[1]?.value || [],
      totalDelivered: orders?.data[0]?.value || [],
    } as Report)
);
// reducers
const orderReducer = orderSlice.reducer;
export default orderReducer;
