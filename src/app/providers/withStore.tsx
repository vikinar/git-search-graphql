import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '../store'

export const withStore = (component: () => ReactNode) => () =>
  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {component()}
      </PersistGate>
    </Provider>
  )
