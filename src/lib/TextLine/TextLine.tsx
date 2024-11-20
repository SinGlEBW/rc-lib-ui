import { styled, Typography, TypographyProps } from '@mui/material';
import React, { FC } from "react";


type TypographyCustomProps =  Omit<TypographyProps, 'children' | 'itemProp'>;

export interface TextLineProps extends TypographyCustomProps{
  first?: string,
  second?: string;
  isFirst?: boolean;
  isSecond?: boolean;
  itemsProps?: Partial<Record<'first' | 'second', TypographyCustomProps>>
}

const TextLineBox = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  '& .Mui-Typography--first': {
    lineHeight: 'normal', 
  },
  '& .Mui-Typography--second': {
    lineHeight: 'normal', 
    fontWeight: 600, 
  }
})
const TextLineFirst = styled(Typography, {
  target: 'Mui-Typography--first'
})({})
const TextLineSecond = styled(Typography, {
  target: 'Mui-Typography--second',
})({
  marginLeft: 5
})


const getPropsWithDefault = (item?: TypographyCustomProps) => {
  return item ? {...commonDefaultProps, ...item} : {...commonDefaultProps}; 
}


const commonDefaultProps: TypographyCustomProps = {
  variant: 'subtitle1'
}
const TextLineMemo: FC<TextLineProps> = ({itemsProps,  variant = 'body2', first, second,  isSecond = true, isFirst = true, ...props }) => {
  const firstProps =  getPropsWithDefault(itemsProps?.first); 
  const secondProps =  getPropsWithDefault(itemsProps?.second); 

  return (
    <TextLineBox
      component='div'
      variant={variant}
      color="text.secondary"
      {...props}
    >
      {isFirst && <TextLineFirst component="span" {...firstProps} children={first} />}
      {isSecond && <TextLineSecond component="span" {...secondProps} children={second} />}
    </TextLineBox>

  )
};

export const TextLine = React.memo(TextLineMemo);
