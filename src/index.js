import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
// import reportWebVitals from '../reportWebVitals'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { store } from './store.js'

const container = document.getElementById('root')
const a = createRoot(container) // createRoot(container!) if you use TypeScript
a.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
)