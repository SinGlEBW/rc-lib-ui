import type { Theme, ThemeOptions } from '@mui/material';
import { grey } from '@mui/material/colors';

export const getLightTheme = (thtme:Theme) => {
  return {
    scrollConfig: {
      color: grey[500]
    },
    palette: {
      mode: 'light',
      background: {
        paper: '#F3F3F3',
      },  
    },
    mixins: {

    },
    components: {

      MuiDataGrid: {

      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            // color: '#1f1f1f'
          }
        }
      },
      MuiButton: {
       
     
      },
      
    }
  } as ThemeOptions;
}

