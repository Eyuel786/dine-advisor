import React, { useEffect, useState } from 'react';
import {
    AppBar, SwipeableDrawer, Tab, Tabs, Toolbar,
    Typography, useScrollTrigger, useMediaQuery, IconButton,
    List, ListItemButton, ListItemText
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';



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
            fontFamily: 'Pacifico',
            color: theme.palette.primary.light,
            fontSize: '2.5rem'
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
    }
}));

const TABS = [
    { name: 'Home', route: '/home' },
    { name: 'Restaurants', route: '/restaurants' },
    { name: 'Add Restaurant', route: '/restaurants/new' }
];

function Header() {
    const styles = useStyles();
    const theme = useTheme();
    const location = useLocation();

    const [tab, setTab] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const iOS =
        typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    useEffect(() => {
        const tabIndex = TABS.findIndex(myTab => myTab.route === location.pathname);
        const myTab = tabIndex < 0 ? false : tabIndex;
        setTab(myTab);
    }, [location]);

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
                    {TABS.map((myTab, index) => (
                        <ListItemButton
                            divider
                            key={myTab.name}
                            to={myTab.route}
                            component={Link}
                            selected={tab === index}
                            className={styles.drawerItem}
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
                </List>
            </SwipeableDrawer>
            <IconButton
                className={styles.drawerIconButton}
                onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon fontSize='large' color='primary' />
            </IconButton>
        </>;

    const tabs = <Tabs
        className={styles.tabs}
        value={tab}
        onChange={handleTabChange}
        TabIndicatorProps={{ sx: { backgroundColor: 'transparent' } }}>
        {TABS.map(myTab => (
            <Tab
                key={myTab.name}
                className={styles.tab}
                to={myTab.route}
                component={Link}
                label={myTab.name} />
        ))}
    </Tabs>

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