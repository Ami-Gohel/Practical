import { all } from 'redux-saga/effects';
import locationSaga from './locationSaga';

//Main Root Saga
const rootSaga = function* rootSaga() {
  yield all([
    locationSaga()
  ])
}
export default rootSaga;