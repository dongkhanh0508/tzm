import { RootState } from 'app/store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationRequest, Response, Store, StoreType, Template } from 'models';
import { toast } from 'react-toastify';
import i18n from 'translation/i18n';

export interface StoreState {
  loading: boolean;
  response: Response<Store>;
  storesInGz: Store[];
  storesEmptyTz: Store[];
  filter: PaginationRequest;
  filterTemplate: PaginationRequest;
  storeTypes: StoreType[];
  templates: Response<Template>;
}
const initialState: StoreState = {
  loading: false,
  response: {
    pageNumber: 1,
    pageSize: 10,
    results: [],
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
  },
  filter: {
    page: 1,
    pageSize: 10,
  },
  storeTypes: [],
  storesInGz: [],
  storesEmptyTz: [],
  templates: {
    pageNumber: 1,
    pageSize: 10,
    results: [],
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
  },
  filterTemplate: {
    page: 1,
    pageSize: 9,
  },
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    fetchStores(state, action: PayloadAction<PaginationRequest>) {
      state.loading = true;
    },
    fetchStoreSuccess(state, action: PayloadAction<Response<Store>>) {
      state.loading = false;
      state.response = action.payload;
    },
    fetchStoreError(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    fetchStoreType(state) {
      console.log('');
    },
    fetchStoreTypeSuccess(state, action: PayloadAction<StoreType[]>) {
      state.storeTypes = action.payload;
    },
    fetchStoreTypeError(state) {
      console.log('');
    },
    setFilter(state, action: PayloadAction<PaginationRequest>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<PaginationRequest>) {
      console.log('');
    },
    fetchStoreTemplates(state, action: PayloadAction<PaginationRequest>) {
      state.loading = true;
    },
    fetchStoreTemplateSuccess(state, action: PayloadAction<Response<Template>>) {
      state.loading = false;
      state.templates = action.payload;
    },
    fetchStoreTemplateError(state) {
      state.loading = false;
      toast.error(i18n.t('common.errorText'));
    },
    setFilterTemplate(state, action: PayloadAction<PaginationRequest>) {
      state.filterTemplate = action.payload;
    },
    setFilterWithDebounceTemplate(state, action: PayloadAction<PaginationRequest>) {
      console.log('');
    },
    // store in gz
    fetchStoresInGz(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    fetchStoresInGzSuccess(state, action: PayloadAction<Store[]>) {
      state.loading = false;
      state.storesInGz = action.payload;
    },
    fetchStoresInGzError(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    // store empty trade zone
    fetchStoresEmptyTz(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    fetchStoresEmptyTzSuccess(state, action: PayloadAction<Store[]>) {
      state.loading = false;
      state.storesEmptyTz = action.payload;
    },
    fetchStoresEmptyTzError(state, action: PayloadAction<string>) {
      state.loading = false;
    },
  },
});
// actions
export const storeActions = storeSlice.actions;
// selector
export const selectStoresResponse = (state: RootState) => state.stores.response;
export const selectLoading = (state: RootState) => state.stores.loading;
export const selectFilter = (state: RootState) => state.stores.filter;
export const selectFilterTemplate = (state: RootState) => state.stores.filterTemplate;
export const selectStoreType = (state: RootState) => state.stores.storeTypes;
export const selectTemplate = (state: RootState) => state.stores.templates;
export const selectStoreTypeOptions = createSelector(selectStoreType, (storeTypes) =>
  storeTypes?.map((storeType) => ({
    name: storeType.name,
    id: storeType.id,
  }))
);
export const selectTemplatesOptions = createSelector(selectTemplate, (templates) =>
  templates?.results?.map((template) => ({
    name: template.name,
    id: template.id,
  }))
);
export const selectStoresOptions = createSelector(selectStoresResponse, (stores) =>
  stores?.results?.map((store) => ({
    name: store.name,
    id: store.id,
  }))
);
// stores in gz
export const selectStoreInGz = (state: RootState) => state.stores.storesInGz;
export const selectStoreInGzOptions = createSelector(selectStoreInGz, (stores) =>
  stores?.map((store) => ({
    name: store.name,
    id: store.id,
  }))
);
// store empty trade zone
export const selectStoreEmptyTz = (state: RootState) => state.stores.storesEmptyTz;
export const selectStoreEmptyTzOptions = createSelector(selectStoreEmptyTz, (stores) =>
  stores?.map((store) => ({
    name: store.name,
    id: store.id,
  }))
);

// reducers
const storeReducer = storeSlice.reducer;
export default storeReducer;
