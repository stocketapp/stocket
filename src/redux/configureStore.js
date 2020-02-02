import { createStore } from 'redux'
import rootStores from './store'

export default function configureStore() {
  const store = createStore(
    rootStores,
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
