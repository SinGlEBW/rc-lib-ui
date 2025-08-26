import type { Theme } from '@mui/material';
import { Typography, type SxProps } from '@mui/material';
import React, { FC, forwardRef, useEffect, useRef, useState } from "react";
import { Tooltips } from '@libs/Tooltips';


export interface ListTextProps {
  isWrapText: boolean;
  title: string;
  sx?: SxProps<Theme>;
  unmount: boolean;
}


const ListTextMemo: FC<ListTextProps> = ({ unmount, isWrapText, title, sx = {} }) => {
  const [tooltipText, setTooltipText] = useState('');
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if(!unmount && textRef.current){
        const textEl = textRef.current as HTMLParagraphElement;
        const id = setTimeout(() => {
          if (textEl?.offsetWidth && textEl?.scrollWidth > textEl?.offsetWidth) {
            setTooltipText(title)
          }
          clearTimeout(id);
        }, 200)
      
    }
  },[title, unmount])


  if (!isWrapText) {
    return !unmount && (
      <TextWithTooltips ref={textRef} tooltipText={tooltipText} title={title} sx={sx} />
    )
  }
 
  return (
    !unmount && (
      <Typography children={title} sx={{ textWrap: 'wrap', overflowWrap: 'break-word', ...sx }} />
    )
  )
};

export const ListText = React.memo(ListTextMemo);


const TextWithTooltips = forwardRef<HTMLParagraphElement, Pick<ListTextProps, 'title' | 'sx'> & { tooltipText: string }>(({ tooltipText, title, sx }, ref) => {
  return (
    <Tooltips variant='default' title={tooltipText}>
      <Typography ref={ref} children={title} noWrap={true} sx={sx} />
    </Tooltips>
  )
});
