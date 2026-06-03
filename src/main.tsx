import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './LibTesting/App.tsx';
import './index.css';
import { Alerts } from './LibTesting/Alerts.tsx';
import { useInteractiveMessage, InteractiveMessageProvider } from '@libs/ControlCards';
import { Preloaders } from '@libs/Preloaders/Preloaders.tsx';
import { TestSocket } from './LibTesting/socket/TestSocket.tsx';
import { TestingNetwork } from './LibTesting/network/TestingNetwork.tsx';
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
       <TestSocket/>
      <TestingNetwork />
    </BrowserRouter>
  )

}

document.addEventListener('DOMContentLoaded', function () {
  start();
});