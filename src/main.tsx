import ReactDOM from 'react-dom/client';
import { App } from './LibTesting/App.tsx';

const start = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
   <App/>
  )
}

document.addEventListener('DOMContentLoaded', function () {
  start();
});