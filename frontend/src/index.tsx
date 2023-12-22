import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import NorrComponent from 'shared/components/norr/Norr'

// Initialize the msw worker, wait for the service worker registration to resolve, then mount
async function render() {

  const rootNode = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )

  rootNode.render(
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />

          <NorrComponent />
        </HashRouter>
      </Provider>
    </React.StrictMode>
  )
}

render()
