import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import Logo, { SmallLogo } from '../logo';
import styled from '@emotion/styled'

const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const menuList = [
  { name: 'Chatroom', link: '/' },
  { name: 'About', link: '/about' }
];

const Appbar = () => {

  const [openNavMenu, setOpenNavMenu] = React.useState(null);
  const [openUserMenu, setOpenUserMenu] = React.useState(null);

  const navMenuHandler = {
    open: (event) => setOpenNavMenu(event.currentTarget),
    close: () => setOpenNavMenu(null),
  };

  const userMenuHandler = {
    open: (event) => setOpenUserMenu(event.currentTarget),
    close: () => setOpenUserMenu(null),
  }

  return (
    <AppBar color='transparent' sx={{ minHeight: '4rem', maxHeight: '4rem' }} position='sticky'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1, display: { xs: 'none', md: 'flex', maxHeight: '3rem' } }}>
            <SmallLogo />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', maxHeight: '3rem' } }}>
            <IconButton size="large" onClick={navMenuHandler.open} >
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={openNavMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(openNavMenu)}
              onClose={navMenuHandler.close}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menuList.map((menu, idx) => (
                <MenuItem key={idx} onClick={navMenuHandler.close}>
                  <StyledLink to={menu.link}>
                    <Typography textAlign="center">
                      {menu.name}
                    </Typography>
                  </StyledLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', maxHeight: '3rem' } }}>
            <SmallLogo />
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuList.map((menu, idx) => (
              <StyledLink key={idx} to={menu.link}>
                <Button>
                  {menu.name}</Button>
              </StyledLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={userMenuHandler.open} sx={{ p: 0 }}>
                <Avatar>A</Avatar>
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }}
              anchorEl={openUserMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(openUserMenu)}
              onClose={userMenuHandler.close}
            >
              <MenuItem key='logout' onClick={userMenuHandler.close}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Appbar;