import React, { useState } from 'react';
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    Typography,
    Grid,
    Box,
    Button,
    Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Dashboard1 from '../component/DashBoardComp1';
import Dashboard2 from '../component/DashBoardComp2';
import Dashboard3 from '../component/DashBoardComp3';
import Dashboard4 from '../component/DashBoardComp4';
import Dashboard5 from '../component/DashBoardComp5';


const Dashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const onUsersClick = () => {
        console.log('Users ');
    }

    const onStats = () => {
        console.log('Stats ');
    }

    const onDBStorage = () => {
        console.log('DB Storage ');
    }

    const onNewUser = () => {
        console.log('On New User ');
    }

    return (
        <Box sx={{ backgroundColor: '#EDEDED', padding: '40px' }}>
            <IconButton
                color="primary"
                onClick={toggleSidebar}
                style={{ position: 'fixed', zIndex: 1 }}
            >
                <MenuIcon />
            </IconButton>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom sx={{ marginLeft: '50px' }}>
                    Dashboard
                </Typography>
            </Grid>
            <Drawer
                anchor="left"
                open={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            >
                <Typography variant='h4' sx={{padding: '20px'}}>Menu</Typography>
                <List>
                    {/* SIDEMENU */}
                    <ListItem button onClick={() => setSidebarOpen(false)}>
                        <Button variant='contained' onClick={onUsersClick}>
                            <FontAwesomeIcon icon={faUser} />
                            <div style={{ width: '20px' }}></div>
                            <Typography variant='p'>
                                Users
                            </Typography>
                        </Button>
                    </ListItem>
                    <ListItem button onClick={() => setSidebarOpen(false)}>
                        <Button variant='contained' onClick={onStats}>
                            <FontAwesomeIcon icon={faUser} size='1x' />
                            <div style={{ width: '20px' }}></div>
                            <Typography variant='p'>
                                Stats
                            </Typography>
                        </Button>
                    </ListItem>
                    <ListItem button onClick={() => setSidebarOpen(false)}>
                        <Button variant='contained' onClick={onDBStorage}>
                            <FontAwesomeIcon icon={faUser} size='1x' />
                            <div style={{ width: '20px' }}></div>
                            <Typography variant='p'>
                                DB Storage
                            </Typography>
                        </Button>
                    </ListItem>
                    <ListItem button onClick={() => setSidebarOpen(false)}>
                        <Button variant='contained' onClick={onNewUser}>
                            <FontAwesomeIcon icon={faUser} size='1x' />
                            <div style={{ width: '20px' }}></div>
                            <Typography variant='p'>
                                New User
                            </Typography>
                        </Button>
                    </ListItem>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12} md={3} >
                            <Box sx={{ justifyContent: 'space-between' }}>

                            </Box>
                            <Box sx={{ justifyContent: 'space-between' }}>
                                
                            </Box>
                            <Box sx={{ justifyContent: 'space-between' }}>
                                
                            </Box>
                            <Box sx={{ justifyContent: 'space-between' }}>
                                
                            </Box>
                        </Grid> */}
                    </Grid>
                </List>
            </Drawer>

            <Grid item xs={12} md={9} margin={5} columnSpacing={5}>
                <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }} spacing={4}>
                    <Dashboard4 />
                    <Dashboard3 />
                </Grid>
                <Box sx={{height:'20px'}}>

                </Box>
                <Box>
                    <Dashboard5 />
                </Box>
            </Grid>
        </Box>
    );
};

export default Dashboard;