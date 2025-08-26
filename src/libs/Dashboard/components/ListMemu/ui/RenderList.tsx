import { List, styled } from '@mui/material';
//INFO: Лучше брать hex из цветов вместо всего объекта т.к. билд вырастает.

export interface RenderListProps {
  styleList?: 'variant1' | 'variant2';

}

export const RenderList = styled(List, {
  shouldForwardProp: (propName) => !['styleList', 'isScrollIndentation'].includes(propName as string),
})<RenderListProps>(({ theme, styleList = 'variant1', }) => {

  return {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      position: 'absolute',
      left: 0,
      right: 0,

      width: 6,
      height: 0,
    },
    '&::-webkit-scrollbar-thumb': {
      // transform: 'translate(10px)',
      position: 'absolute',
      left: 0,
      right: 0,
      
      borderRadius: 100,
      background: 'rgba(148,87,235, 0.4)',
      // border: 'none',
      border: '1px solid rgba(0, 0, 0, 0.10)',
    },
    '@-moz-document url-prefix()': {
      'div': {
        // scrollbarColor: `${scrollConfig?.color} !important`,
        // scrollbarWidth: 'thin !important'
      }
    },
    minWidth: styleList === 'variant1' ? '40px' : '53px',

    '& .MuiCollapse-root .MuiButtonBase-root': {
      marginLeft: theme.spacing(1.5),
    },
    ...(styleList === 'variant1') && {

    },
    ...(styleList === 'variant2') && {
      '& .MuiListItem-root': {
        padding: `0 ${theme.spacing(1)}`,
      },
      '& .MuiButtonBase-root': {
        borderRadius: '5px',
        '&.Mui-selected': {
          backgroundColor: 'rgba(33,150,243, 0.16)'
        }
      },

    }
  }
})



/*

  export const RenderList = styled(({ isScrollIndentation, sx = {}, ...props }: Pick<RenderListProps, 'isScrollIndentation'> & ListProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ widthScroll: 0 })

  useEffect(() => {
    if (isScrollIndentation && listRef.current) {
      const { clientWidth, offsetWidth } = listRef.current
      const widthScroll = offsetWidth - clientWidth;
      console.dir(widthScroll);
      setState({widthScroll})
    }
  }, [isScrollIndentation])
  return (
    <List
      ref={listRef}
      sx={(sxProps) => {
        let styleByScrollIndentation = {};
        if(isScrollIndentation){
          console.dir(22);
          styleByScrollIndentation = {
            
          }
        }
        
        if(typeof sx === 'function'){
          let a = sx(sxProps);
          console.dir({...a});
          return {...sx(sxProps), ...styleByScrollIndentation};
        }
          
        return typeof sx === 'object' ? {...sx, ...styleByScrollIndentation} as CSSObject : {}
      }}
      {...props}
    />
  )
},
*/