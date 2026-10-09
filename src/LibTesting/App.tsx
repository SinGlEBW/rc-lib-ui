import { TestSocket } from './TestingComponents/socket/TestSocket';
import './index.css';



// const handlePopoverButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//   event.stopPropagation();
// };


export const App = () => {


  return (
    <>
      {/* <MaterialDarkMode isDarkTheme={false}> */}

      {/* </MaterialDarkMode> */}
      {/* <TestingPreloaders /> */}

      <TestSocket />

      {/* <InteractiveMessageProvider >
        <Alerts children={<App />} />
      </InteractiveMessageProvider> */}
      {/* < TestingNetwork /> */}
    </>
  )
}


