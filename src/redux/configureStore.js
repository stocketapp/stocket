import { createStore, compose } from 'redux'
import rootStores from './store'
// import devTools from 'remote-redux-devtools'

export default function configureStore() {
  const store = createStore(
    rootStores,
    // devTools(),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./store').default)
    })
  }
  return store
}
