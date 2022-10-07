import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { PaginationRequest, Response, Store, StoreType } from 'models';
import storeApi from 'api/storeApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { storeActions } from './storeSlice';
import { Template } from '../../models/dto/store';

function* fetchStore(action: PayloadAction<PaginationRequest>) {
  try {
    const rs: Response<Store> = yield call(storeApi.getAllPaging, action.payload);
    yield put(storeActions.fetchStoreSuccess(rs));
  } catch (error) {
    yield put(storeActions.fetchStoreError(''));
  }
}
function* fetchStoreType() {
  try {
    const rs: Array<StoreType> = yield call(storeApi.getStoreTypes);
    yield put(storeActions.fetchStoreTypeSuccess(rs));
  } catch (error) {
    yield put(storeActions.fetchStoreTypeError());
  }
}
function* fetchStoreTemplate(action: PayloadAction<PaginationRequest>) {
  try {
    const rs: Response<Template> = yield call(storeApi.getTemplates, action.payload);
    yield put(storeActions.fetchStoreTemplateSuccess(rs));
  } catch (error) {
    yield put(storeActions.fetchStoreTemplateError());
  }
}
function* searchWithDebounce(action: PayloadAction<PaginationRequest>) {
  yield put(storeActions.setFilter(action.payload));
}
function* searchWithDebounceTemplate(action: PayloadAction<PaginationRequest>) {
  yield put(storeActions.setFilterTemplate(action.payload));
}
function* fetchStoreInGz(action: PayloadAction<number>) {
  try {
    const rs: Store[] = yield call(storeApi.getStoresInGz, action.payload);
    yield put(storeActions.fetchStoresInGzSuccess(rs));
  } catch (error) {
    yield put(storeActions.fetchStoresInGzError(''));
  }
}
function* fetchStoreEmptyTz(action: PayloadAction<number>) {
  try {
    const rs: Store[] = yield call(storeApi.getStoreEmptyTz, action.payload);
    yield put(storeActions.fetchStoresEmptyTzSuccess(rs));
  } catch (error) {
    yield put(storeActions.fetchStoresEmptyTzError(''));
  }
}
export default function* storeSaga() {
  // watch fetch student action
  yield takeLatest(storeActions.fetchStores.type, fetchStore);
  yield takeLatest(storeActions.fetchStoresEmptyTz.type, fetchStoreEmptyTz);
  yield takeLatest(storeActions.fetchStoresInGz.type, fetchStoreInGz);
  yield takeLatest(storeActions.fetchStoreType.type, fetchStoreType);
  yield takeLatest(storeActions.fetchStoreTemplates.type, fetchStoreTemplate);
  yield debounce(800, storeActions.setFilterWithDebounce.type, searchWithDebounce);
  yield debounce(800, storeActions.setFilterWithDebounceTemplate.type, searchWithDebounceTemplate);
}
