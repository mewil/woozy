import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { spawn, all } from 'redux-saga/effects';
import { enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';
import { END } from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { map } from 'lodash';

import { createReduxSagaMiddleware } from './middleware';
import { packages } from './packages';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme'],
};

export const history = createBrowserHistory();

const sagaMiddleware = createReduxSagaMiddleware();

const prepSagas = (sagas = {}, options = []) =>
  map(sagas, (saga) => spawn(saga, ...options));

const sagaCreator = (sagas) =>
  function* rootSaga(...options) {
    yield all(prepSagas(sagas, options));
  };

const middleware = [
  sagaMiddleware,
  batchDispatchMiddleware,
  routerMiddleware(history),
];

const enhancer = compose(applyMiddleware(...middleware));

const rootReducers = enableBatching(
  persistCombineReducers(persistConfig, {
    ...packages.reducers,
    router: connectRouter(history),
  }),
);

const rootSagas = sagaCreator(packages.sagas);

export const configureStore = () => {
  const store = createStore(rootReducers, enhancer);
  persistStore(store);
  window.store = store;
  store.close = () => store.dispatch(END);
  sagaMiddleware.run(rootSagas);
  return store;
};
