import * as React from 'react';
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
import {LunchDining} from "@mui/icons-material";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom"


const NavBar = () => {

    const {isAuthenticated, user, isLoading, logout, loginWithRedirect} = useAuth0();

    const loginSettings = [{
        name: 'Logout', action: () => logout({returnTo: window.location.origin}),
    }];

    const logoutSettings = [{
        name: 'Login', action: () => loginWithRedirect(),
    }]
    const pages = [{
        name: 'MENU', path: '/snackbars',
    }, {
        name: 'YOUR ORDERS', path: '/orders',
    }, {
        name: 'NEW ORDER', path: '/new-order',
    }]

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (<AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <LunchDining sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    SNACKBAR
                </Typography>

                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom', horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                        {pages.map((page) => (
                            <Link key={page.name} to={page.path}>
                                <MenuItem onClick={handleCloseNavMenu} cy-data={page.name + "-link"}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>
                </Box>
                <LunchDining sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'},
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    SNACKBAR
                </Typography>
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {pages.map((page) => (<Link key={page.name} to={page.path}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            {page.name}
                        </Button>
                    </Link>))}
                </Box>

                <Box sx={{flexGrow: 0}} cy-data="user-icon-button">
                    {!isLoading && isAuthenticated ? (<Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}  cy-data="user-icon-button">
                            <Avatar alt={user.name} src={user.picture}/>
                        </IconButton>
                    </Tooltip>) : (<Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt="guest"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"/>
                        </IconButton>
                    </Tooltip>)}
                    < Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                        keepMounted
                        transformOrigin={{vertical: 'top', horizontal: 'right',}}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}

                    >
                        {!isLoading && isAuthenticated ? (loginSettings.map((setting) => (
                            <MenuItem key={setting.name} onClick={setting.action} cy-data={setting.name}>
                                <Typography textAlign="center">{setting.name}</Typography>
                            </MenuItem>))) : (logoutSettings.map((setting) => (
                            <MenuItem key={setting.name} onClick={setting.action} cy-data={setting.name}>
                                <Typography textAlign="center">{setting.name}</Typography>
                            </MenuItem>)))}
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>);
};
export default NavBar;
