# React Components

### Example
```tsx
import { Preloaders } from 'rc-lib-ui'

export const App = () => {
//SpinnerGrow | SpinnerBorder | Spinner3D | Ball | Time | Cube | RotateCube

  return (
    <>
     <Preloaders  name='Ball' show={true} > 
       <div className='content'></div>
     </Preloaders>
    </>
  )
}

```


