import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './app/store'

// App inspired by:
// https://redux.js.org/tutorials/essentials/part-5-async-logic
// https://github.com/honglytech/react-redux-toolkit/blob/main/src/features/users/usersSlice.js

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)

serviceWorker.unregister()
