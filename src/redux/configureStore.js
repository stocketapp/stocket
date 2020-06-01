import { createStore, applyMiddleware, compose } from 'redux'
import rootStores from './store'

export default function configureStore() {
  let store
  const createDebugger = require('redux-flipper').default
  const reduxDebugger = createDebugger()

  if (__DEV__) {
    const enchancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose
    store = createStore(rootStores, enchancer(applyMiddleware(reduxDebugger)))
    if (module.hot) {
      module.hot.accept(() => {
        store.replaceReducer(require('./store').default)
      })
    }
  } else {
    store = createStore(rootStores, {})
  }
  return store
}
