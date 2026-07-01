import { InteractiveMessageProvider } from '@libs/ControlCards';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Alerts } from './LibTesting/TestingComponents/Alerts.tsx';
import { TestingNetwork } from './LibTesting/TestingComponents/network/TestingNetwork.tsx';
import { TestSocket } from './LibTesting/TestingComponents/socket/TestSocket.tsx';
import { TestingPreloaders } from './LibTesting/TestingComponents/TestingPreloaders.tsx';
// import {} from '@libs/NetworkAndSocket'
// import { Preloaders, } from '../dist/Preloaders/index.js';
const start = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      {/* <MaterialDarkMode isDarkTheme={false}> */}
      {/* <Preloaders name='SpinnerBorder' show={true} text='asdas' size={30} bgColor='#456789' sx={() => ({backgroundColor: 'red'})}/> */}
      <InteractiveMessageProvider >
        <Alerts>
          {/* <App /> */}
        </Alerts>
      </InteractiveMessageProvider>
      {/* </Preloaders> */}
      {/* </MaterialDarkMode> */}
      <TestingPreloaders />
      <TestSocket />
      <TestingNetwork />
    </BrowserRouter>
  )

}

document.addEventListener('DOMContentLoaded', function () {
  start();
});