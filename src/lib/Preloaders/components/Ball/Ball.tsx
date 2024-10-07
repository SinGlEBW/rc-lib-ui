import React from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import s from "./Ball.module.scss";

export interface BallProps {
  text?: string;
  textPosition?: 'top' | 'bottom';
  sx?: SxProps<Theme>;
}


const BallMemo = React.forwardRef<HTMLDivElement, BallProps>(({ text, sx, textPosition = 'top' }, ref) => {
  // const _textPosition 
  // [textPosition]: '-50%' 
  return (

    <Box sx={sx} className={s.wrap} ref={ref}>
      <Box className={s.inner}>
        {
          (text)
          && (
            <Box sx={{ order: textPosition === 'top' ? 0 : 1 }} component={'p'} className={s.text}>
              {text}
            </Box>
          )
        }
        <Box className={s.loader}>
          <Box className={`${s.item} ${s.one}`}></Box>
          <Box className={`${s.item} ${s.two}`}></Box>
          <Box className={`${s.item} ${s.three}`}></Box>
        </Box>
      </Box>
    </Box>
  );
})
export const Ball = React.memo(BallMemo);