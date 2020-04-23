import { createStore, applyMiddleware } from 'redux'
import rootStores from './store'

export default function configureStore() {
  let store
  if (__DEV__) {
    const createDebugger = require('redux-flipper').default
    let reduxDebugger = createDebugger()
    store = createStore(
      rootStores,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(reduxDebugger),
    )
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
