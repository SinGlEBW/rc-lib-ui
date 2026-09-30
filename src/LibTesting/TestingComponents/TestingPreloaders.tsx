import { Preloaders } from '@libs/Preloaders';
import { Box, Button } from '@mui/material';
import React, { FC, ReactNode, useState } from "react"

export interface TestingPreloadersProps {
  children?: ReactNode;
}

const TestingPreloadersMemo: FC<TestingPreloadersProps> = (props) => {
  const [isPreloader, setIsPreloader] = useState(true)
  const toggleActivePreloader = () => {
    console.dir(1);
    setIsPreloader((prev) => !prev);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Button onClick={toggleActivePreloader}>toggle</Button>
      <Box sx={{ flexGrow: 1, position: 'relative', display: 'flex' }}>
        <Preloaders
          // onEnter={() => {  console.log('onEnter')}}
          // onEntering={() => {  console.log('onEntering')}}
          // onEntered={() => {  console.log('onEntered')}}
          // onExit={() => {  console.log('onExit')}}
          // onExiting={() => {  console.log('onExiting')}}
          // onExited={() => {  console.log('onExited')}}
          
        
          timeout={300}
          show={isPreloader} 
          slotProps={{
            transition: {
              animation: 'fade',
            },
            preloader: {
              name: 'SpinnerBorder',
              sx: {
                backgroundColor: 'info.dark',
              }
            }
          }}
          // sx={() => ({ backgroundColor: 'MenuText', zIndex: 1301 })}
        >
          <div className='TestingPreloaders' style={{height: '100%'}}>
            Контент
          </div>
        </Preloaders>
      </Box>
    </Box>
  )
};

export const TestingPreloaders = React.memo(TestingPreloadersMemo);
