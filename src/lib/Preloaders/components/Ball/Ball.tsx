import React from 'react';
import { Box, SxProps } from '@mui/material';
import s from "./Ball.module.scss";

export interface BallProps {
  titlePreloader?: string;
  children?: React.ReactNode;
  sx?:SxProps;
}

const BallMemo = React.forwardRef<HTMLDivElement, BallProps>(({titlePreloader, sx, children}, ref) => {

  return (
    <>
      <Box sx={sx} className={s.wrap} ref={ref}>
        <Box className={s.loader}>
          <Box className={`${s.inner} ${s.one}`}></Box>
          <Box className={`${s.inner} ${s.two}`}></Box>
          <Box className={`${s.inner} ${s.three}`}></Box>
        </Box>
        <Box className='Ball-Content' sx={{position: 'absolute'}}>
        { children }
      </Box>
      </Box>
      {
        (titlePreloader) 
        ? (
          <Box component={'p'} className={s.text}>
          { `Загрузка ${titlePreloader} ...` }
          </Box>
        )
        : ''
      }
    </>
  );
})
export const Ball = React.memo(BallMemo);