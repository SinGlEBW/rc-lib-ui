// import { Preloaders } from '@lib';
import { Preloaders } from '../dist'
import './App.css'

export const App = () => {
  return (
    <>
     <Preloaders  name='RotateCube' show={true} > 
       <div className='content'></div>
     </Preloaders>
    </>
  )
}


