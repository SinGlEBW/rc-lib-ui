import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './LibTesting/App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* <MaterialDarkMode isDarkTheme={false}> */}
    <App />
    {/* </MaterialDarkMode> */}
  </BrowserRouter>
)
