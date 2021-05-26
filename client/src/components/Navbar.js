import {NavLink} from "react-router-dom";
import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import {Button, Toolbar, Typography} from "@material-ui/core";
import s from './Navbar.module.css'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    // menuButton: {
    //     marginRight: theme.spacing(2),
    // },
    title: {
        flexGrow: 1,
    },
}));

function Navbar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <div className={s.navWrapper}>
                        <Typography variant="h3" className={classes.title}>
                            News
                        </Typography>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <Button color='white'><NavLink className={s.button} to="/">Главная</NavLink></Button>
                            <Button color='white'><NavLink className={s.button} to="/editor">Редактор</NavLink></Button>
                            <Button color='white'><NavLink className={s.button} to="/calculator">О нас</NavLink></Button>
                        </ul>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}


export default Navbar;