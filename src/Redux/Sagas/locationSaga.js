import { put, call, takeEvery } from 'redux-saga/effects'
import {  GET_GEO_LOCATION_REQUEST, GET_GEO_LOCATION_SUCCESS } from '../Types';

export const getLocationSaga = function* getLocationSaga({params}) {
    yield put({type: GET_GEO_LOCATION_SUCCESS, payload : params})
}

export  function * locationSaga () {
  yield takeEvery(GET_GEO_LOCATION_REQUEST,getLocationSaga);
}
export default locationSaga;