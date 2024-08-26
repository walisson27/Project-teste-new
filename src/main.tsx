import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globais.css'
import './../reset.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import {store} from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
