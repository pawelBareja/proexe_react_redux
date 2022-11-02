import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './app/store'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)

serviceWorker.unregister()