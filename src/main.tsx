import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './LibTesting/App.tsx';

import './index.css';

// import { Preloaders, } from '../dist/Preloaders/index.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* <MaterialDarkMode isDarkTheme={false}> */}
    {/* <Preloaders name='SpinnerBorder' show={true} text='asdas' size={30} bgColor='#456789'> */}
      <App />
    {/* </Preloaders> */}
    {/* </MaterialDarkMode> */}
  </BrowserRouter>
)
