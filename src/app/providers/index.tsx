import compose from 'compose-function'

import { withPersistor } from '@src/app/providers/withPersistor'

import { withRouter } from './withRouter'
import { withStore } from './withStore'

export const withProviders = compose(withRouter, withStore, withPersistor)
