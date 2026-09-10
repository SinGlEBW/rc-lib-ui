import { Preloaders } from '@libs/Preloaders';
import { Box, Button } from '@mui/material';
import React, { FC, ReactNode, useState } from "react"

export interface TestingPreloadersProps {
  children?: ReactNode;
}

const TestingPreloadersMemo: FC<TestingPreloadersProps> = (props) => {
  const [isPreloader, setIsPreloader] = useState(true)
  const toggleActivePreloader = () => {
    setIsPreloader((prev) => !prev);
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Button onClick={toggleActivePreloader}>toggle</Button>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Preloaders
          // onEnter={() => { debugger; console.log('onEnter')}}
          // onEntering={() => { debugger; console.log('onEntering')}}
          // onEntered={() => { debugger; console.log('onEntered')}}
          // onExit={() => { debugger; console.log('onExit')}}
          // onExiting={() => { debugger; console.log('onExiting')}}
          // onExited={() => { debugger; console.log('onExited')}}
          name='Time'
          show={isPreloader} text='asdas' size={30} bgColor='#456789'
          sx={() => ({ backgroundColor: 'MenuText', zIndex: 1301 })}
        >
          <div className='TestingPreloaders'>
            Контент
          </div>
        </Preloaders>
      </Box>
    </Box>
  )
};

export const TestingPreloaders = React.memo(TestingPreloadersMemo);
