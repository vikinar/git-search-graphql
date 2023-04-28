import { ReactNode } from 'react'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor } from '../store'

export const withPersistor = (component: () => ReactNode) => () =>
  (
    <PersistGate loading={null} persistor={persistor}>
      {component()}
    </PersistGate>
  )
