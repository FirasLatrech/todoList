import AuthProvider from './modules/shared/providers/AuthProvider'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { store } from './modules/shared/store'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Suspense } from 'react'
import App from './app/App'
import './app/index.scss'
import './i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HelmetProvider>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </HelmetProvider>
)
