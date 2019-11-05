import React from 'react';
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';
import FavIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import messages from "./messages"

const useStyles = makeStyles(theme => ({
    icons: {
        marginRight: 10
    },
    link: {
        textDecoration: 'none',
        color: '#FFF',
    },
    menuLinks: {
        marginLeft: 'auto',
    },
}));

const AppTopBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    <FormattedMessage {...messages.appName} />
                </Typography>
                <Link to="/" className={clsx(classes.menuLinks ,classes.link)}>
                    <Button color="inherit">
                        <ListIcon className={classes.icons} />
                        <FormattedMessage {...messages.todoList} />
                    </Button>
                </Link>
                <Link to="/favorites" className={classes.link}>
                    <Button color="inherit">
                        <FavIcon className={classes.icons} />
                        <FormattedMessage {...messages.favoritesTodoList} />
                    </Button>
                </Link>
                <Link to="/edit" className={classes.link}>
                    <Button color="inherit">
                        <AddIcon className={classes.icons} />
                        <FormattedMessage {...messages.addTodo} />
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default AppTopBar;
