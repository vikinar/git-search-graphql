import { Routing } from '../pages'
import { withProviders } from './providers'
import './styles/index.scss'

function App() {
  return (
    <div className="app">
      <Routing />
    </div>
  )
}

export default withProviders(App)
