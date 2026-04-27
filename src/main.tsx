import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './LibTesting/App.tsx';
import './index.css';
import { Alerts } from './LibTesting/Alerts.tsx';
import { useInteractiveMessage, InteractiveMessageProvider } from '@libs/ControlCards';
// import {} from '@libs/NetworkAndSocket'
// import { Preloaders, } from '../dist/Preloaders/index.js';
const start = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      {/* <MaterialDarkMode isDarkTheme={false}> */}
      {/* <Preloaders name='SpinnerBorder' show={true} text='asdas' size={30} bgColor='#456789'> */}
      <InteractiveMessageProvider >
        <Alerts>
          {/* <App /> */}
        </Alerts>
      </InteractiveMessageProvider>
      {/* </Preloaders> */}
      {/* </MaterialDarkMode> */}
    </BrowserRouter>
  )

}

document.addEventListener('DOMContentLoaded', function () {
  start();
});