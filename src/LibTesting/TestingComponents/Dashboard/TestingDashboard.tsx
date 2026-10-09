import React, { FC, ReactNode, Fragment } from "react"
import { Dashboard, DashboardProps, type DashboardControlProps } from '@libs/Dashboard';
import { Archive, ListSharp, MoreHoriz, StarBorder } from '@mui/icons-material';
import { Chip, IconButton, Menu, MenuItem, Typography } from '@mui/material';

const popoverMenuAction = (
  <Fragment>
    <IconButton onClick={() => { }}>
      <MoreHoriz />
    </IconButton>
    <Menu
      open={false}
      anchorEl={null}
      onClose={() => { }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      disableAutoFocus
      disableAutoFocusItem
    >
      <MenuItem onClick={() => { }}>New call</MenuItem>
      <MenuItem onClick={() => { }}>Mark all as read</MenuItem>
    </Menu>
  </Fragment>
);

const listMenu = [
  {
    // icon: <Archive sx={{ width: 25 }} />,
    title: <p>asdsadsad</p>,
    // to: '/test',
    onClick: (e) => {
      e.preventDefault()
      console.dir(1);
    },
    action: (
      <Chip label={7} color="primary" size="small"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault()
          console.dir(2);
        }} />
    ),
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    // to: '/test2',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    to: '/test3',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    // to: '/test4',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    // to: '/test5',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    // to: '/test6',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <ListSharp />,
    title: <Typography sx={{ color: 'red', fontWeight: 'bold' }}>Lists A</Typography>,
    sx: { mx: 0 },

    // action: popoverMenuAction,
    children: [
      {
        title: "List 1",
        icon: <StarBorder />
      },
      {
        title: "List 2",
        icon: <StarBorder />
      },
    ],
  },
  {
    icon: <ListSharp />,
    title: <Typography sx={{ color: 'red', fontWeight: 'bold' }}>Lists B</Typography>,
    sx: { mx: 0 },

    // action: popoverMenuAction,
    children: [
      {
        title: "List 1",
        icon: <StarBorder />
      },
      {
        title: "List 2",
        icon: <StarBorder />
      },
      {
        title: "List 1",
        icon: <StarBorder />
      },
      {
        title: "List 2",
        icon: <StarBorder />
      },
      {
        title: "List 1",
        icon: <StarBorder />
      },
      {
        title: "List 2",
        icon: <StarBorder />
      },
      {
        title: "List 1",
        icon: <StarBorder />
      },
      {
        title: "List 2",
        icon: <StarBorder />
      },
      {
        title: "List 1",
        icon: <StarBorder />
      },
      {
        title: "List 2",
        icon: <StarBorder />
      },
      {
        title: "List 1",
        icon: <StarBorder />
      },
      {
        title: "List 2",
        icon: <StarBorder />
      },
      {
        title: "List 1",
        icon: <StarBorder />
      },
      {
        title: "List 2",
        icon: <StarBorder />
      },
    ],
  }

] as DashboardProps['listMenu']


// const listMenu = [
//   // {
//   //   icon: <Archive sx={{ width: 25 }} />,
//   //   title: "Archive loooooooooooooooooooooooooooong text",
//   //   action: <Chip label={7} color="primary" size="small" />,
//   // },
//   {
//     // icon: <Skeleton variant="circular" width={40} height={40} />,
//     title: <Skeleton animation="wave" height={30} width="80%" />,
//     // sx: { mx: 0 },

//     // action: popoverMenuAction,
//     children: Array.from({ length: 10 }).map((_, index) => {
//       return {
//         icon: <Skeleton variant="circular" width={50} height={50} />,
//         title: (
//           <Box className="Box-Skeleton" >
//             <Skeleton animation="wave" height={30} />
//             <Skeleton animation="wave" height={20} width={'100%'} />
//           </Box>
//         )
//       }
//     })

//   },
// ] as DashboardProps["listMenu"];

export interface TestingDashboardProps {
  children?: ReactNode;
}

const TestingDashboardMemo:FC<TestingDashboardProps> = (props) => {
  return (
    <div className='TestingDashboard'>
      
    </div>
  )
};

export const TestingDashboard = React.memo(TestingDashboardMemo);
