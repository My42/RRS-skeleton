import { all, takeLatest, call } from 'redux-saga/effects';

function* helloWord() {
  yield call(console.log, 'Hello World from Redux-Saga');
}

export default function* rootSaga() {
  yield all([
    takeLatest('HELLO WORLD', helloWord),
  ]);
}
