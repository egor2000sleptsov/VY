import React from 'react';
import s from './Navbar.module.css'
import {makeStyles} from "@material-ui/styles";
import {Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

function Navbar(props) {
    const classes = useStyles();
    // return (
    //     <div className={classes.root}>
    //         <AppBar position="static">
    //             <Toolbar>
    //                 <div className={s.navWrapper}>
    //                     <div>
    //                         <Typography variant="h3" className={classes.title}>
    //                             VOLT YAKUTIA
    //                         </Typography>
    //                     </div>
    //                     <div>
    //                         <ul id="nav-mobile" className="right hide-on-med-and-down">
    //                             <Button color='white'><NavLink className={s.button} to="/">Главная</NavLink></Button>
    //                             <Button color='white'><NavLink className={s.button}
    //                                                            to="/editor">Редактор</NavLink></Button>
    //                             <Button color='white'><NavLink className={s.button} to="/calculator">О
    //                                 нас</NavLink></Button>
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </Toolbar>
    //         </AppBar>
    //     </div>
    // );

    return (
        <div className={s.navbar}>
            <div className={s.logo}>
                <h4>VOLT YAKUTIA</h4>
            </div>
            <div className={s.links}>
                <Button><NavLink className={s.button} to='/'>Главная</NavLink></Button>
                <Button><NavLink className={s.button} to='/editor'>Редактор</NavLink></Button>
                <Button><NavLink className={s.button} to='/'>О нас</NavLink></Button>
            </div>
        </div>
    )
}


export default Navbar;
