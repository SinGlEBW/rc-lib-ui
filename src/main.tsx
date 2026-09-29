import { InteractiveMessageProvider } from '@libs/ControlCards';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Alerts } from './LibTesting/TestingComponents/Alerts.tsx';
import { TestingNetwork } from './LibTesting/TestingComponents/network/TestingNetwork.tsx';
import { TestSocket } from './LibTesting/TestingComponents/socket/TestSocket.tsx';
import { TestingPreloaders } from './LibTesting/TestingComponents/TestingPreloaders.tsx';
import { App } from './LibTesting/App.tsx';
import { Preloaders } from '@libs/Preloaders/Preloaders.tsx';
// import {} from '@libs/NetworkAndSocket'

const start = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      {/* <MaterialDarkMode isDarkTheme={false}> */}

      {/* </MaterialDarkMode> */}
      <TestingPreloaders />

      {/* <TestSocket /> */}
 
      {/* <InteractiveMessageProvider >
        <Alerts children={<App />} />
      </InteractiveMessageProvider> */}
      {/* < TestingNetwork /> */}
    </BrowserRouter >
  )

}

document.addEventListener('DOMContentLoaded', function () {
  start();
});