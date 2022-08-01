import React, { useEffect, useMemo, useState } from 'react';
import {
    AppBar, SwipeableDrawer, Tab, Tabs, Toolbar,
    Typography, useScrollTrigger, useMediaQuery, IconButton,
    List, ListItemButton, ListItemText, Button, Avatar, Menu, MenuItem
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutRequest } from '../store';

function ElevationOnScroll({ children }) {

    const trigger = useScrollTrigger();

    return React.cloneElement(children, {
        elevation: trigger ? 2 : 0
    });
}

const useStyles = makeStyles(theme => ({
    appBar: {
        '&.MuiAppBar-root': {
            padding: '0 6rem',
            backgroundColor: '#fff',
            zIndex: theme.zIndex.modal + 1,
            boxShadow: theme.shadows[1],

            [theme.breakpoints.down('lg')]: {
                padding: '0 1rem'
            }
        }
    },
    logo: {
        '&.MuiTypography-root': {
            ...theme.typography.logo,
            color: '#000'
        }
    },
    toolbarMargins: {
        height: '5rem'
    },
    tabs: {
        marginLeft: 'auto'
    },
    tab: {
        '&.MuiTab-root': {
            ...theme.typography.tab,
            borderRadius: '50px',
            '&:hover': {
                backgroundColor: theme.palette.grey[200]
            },
            '&.Mui-selected': {
                color: theme.palette.common.blue
            }
        }
    },
    drawerIconButton: {
        '&.MuiIconButton-root': {
            marginLeft: 'auto'
        }
    },
    drawerItem: {
        '&.Mui-selected': {
            color: theme.palette.common.blue,
            backgroundColor: 'transparent'
        }
    },
    drawerItemText: {
        '&.MuiListItemText-root': {
            ...theme.typography.tab,
            color: 'inherit'
        }
    },
    signInBtn: {
        '&.MuiButton-root': {
            ...theme.typography.btn,
            '&:hover': {
                backgroundColor: theme.palette.primary.light
            }
        }
    },
    userListItem: {
        '&.MuiListItemButton-root': {
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            '&:hover': {
                backgroundColor: theme.palette.primary.light
            }
        }
    },
    avatarButton: {
        '&.MuiButton-root': {
            '&:hover': {
                background: 'none'
            }
        }
    },
    menuItem: {
        '&.MuiMenuItem-root': {
            ...theme.typography.tab
        }
    }
}));


function Header(props) {
    const styles = useStyles();
    const theme = useTheme();
    const location = useLocation();
    const dispatch = useDispatch();
    const { token, image, username } = props;

    const memoizedTabs = useMemo(() => {
        const TABS = [
            { name: 'Home', route: '/home' },
            { name: 'Restaurants', route: '/restaurants' },
            { name: 'About Us', route: '/about' },
            { name: 'Contact Us', route: '/contact' }
        ];

        if (token) {
            TABS.splice(2, 0, {
                name: 'Add Restaurant',
                route: '/restaurants/new'
            });
        }

        return TABS;
    }, [token]);

    const [tab, setTab] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = e => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    }

    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const iOS =
        typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    useEffect(() => {
        const tabIndex = memoizedTabs.findIndex(myTab => myTab.route === location.pathname);
        const myTab = tabIndex < 0 ? false : tabIndex;
        setTab(myTab);
    }, [location, memoizedTabs]);

    const handleTabChange = (e, newVal) => setTab(newVal);

    const drawer =
        <>
            <SwipeableDrawer
                open={openDrawer}
                onOpen={() => setOpenDrawer(true)}
                onClose={() => setOpenDrawer(false)}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}>

                <Toolbar
                    className={styles.toolbarMargins} />

                <List disablePadding>
                    {memoizedTabs.map((myTab, index) => (
                        <ListItemButton
                            divider
                            key={myTab.name}
                            to={myTab.route}
                            component={Link}
                            selected={tab === index}
                            className={styles.drawerItem}
                            disableRipple
                            onClick={() => {
                                setOpenDrawer(false);
                                setTab(index);
                            }}>
                            <ListItemText
                                className={styles.drawerItemText}
                                disableTypography>
                                {myTab.name}
                            </ListItemText>
                        </ListItemButton>
                    ))}

                    {!token && <ListItemButton
                        divider
                        to='/signin'
                        component={Link}
                        disableRipple
                        className={styles.userListItem}
                        onClick={() => {
                            setOpenDrawer(false);
                            setTab(false);
                        }}>
                        <ListItemText
                            className={styles.drawerItemText}
                            disableTypography>
                            Sign in
                        </ListItemText>
                    </ListItemButton>}
                    {token &&
                        <ListItemButton
                            divider
                            disableRipple
                            className={styles.userListItem}
                            onClick={() => {
                                setOpenDrawer(false);
                                setTab(1);
                                dispatch(logoutRequest());
                            }}>
                            <ListItemText
                                className={styles.drawerItemText}
                                disableTypography>
                                Sign out
                            </ListItemText>
                        </ListItemButton>}
                </List>
            </SwipeableDrawer>

            <IconButton
                className={styles.drawerIconButton}
                onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon fontSize='large' color='primary' />
            </IconButton>
        </>;

    const tabs = <>
        <Tabs
            className={styles.tabs}
            value={tab}
            onChange={handleTabChange}
            TabIndicatorProps={{ sx: { backgroundColor: 'transparent' } }}>
            {memoizedTabs.map(myTab => (
                <Tab
                    key={myTab.name}
                    className={styles.tab}
                    to={myTab.route}
                    component={Link}
                    label={myTab.name}
                    disableRipple />
            ))}
        </Tabs>
        {!token && <Button
            to='/signin'
            component={Link}

            className={styles.signInBtn}
            onClick={() => setTab(false)}>
            Sign in
        </Button>}
        {token &&
            <Button
                className={styles.avatarButton}
                aria-owns='simple-menu'
                aria-haspopup={true}
                onClick={handleMenuOpen}
                disableRipple>
                <Avatar
                    src={image}
                    alt={username}>
                    {username.slice(0, 1)}
                </Avatar>
            </Button>
        }
        <Menu
            id='simple-menu'
            open={openMenu}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            MenuListProps={{ onMouseLeave: handleMenuClose }}>
            <MenuItem
                className={styles.menuItem}
                onClick={() => {
                    handleMenuClose();
                    setTab(1);
                    dispatch(logoutRequest());
                }}>
                Logout
            </MenuItem>
        </Menu>
    </>

    return (
        <>
            <ElevationOnScroll>
                <AppBar
                    className={styles.appBar}>
                    <Toolbar disableGutters>
                        <Typography
                            className={styles.logo}
                            variant='h4'>
                            Dineadvisor
                        </Typography>
                        {matchesMd ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationOnScroll>
            <Toolbar className={styles.toolbarMargins} />
        </>
    );
}

export default Header;