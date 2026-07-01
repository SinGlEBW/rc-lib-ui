import { Preloaders } from '@libs/Preloaders';
import React, { FC, ReactNode } from "react"

export interface TestingPreloadersProps {
  children?: ReactNode;
}

const TestingPreloadersMemo: FC<TestingPreloadersProps> = (props) => {
  return (
    <Preloaders name='SpinnerBorder' show={true} text='asdas' size={30} bgColor='#456789' sx={() => ({backgroundColor: 'MenuText', zIndex: 1301})}>
      <div className='TestingPreloaders'>
        Контент
      </div>
    </Preloaders>
  )
};

export const TestingPreloaders = React.memo(TestingPreloadersMemo);
