import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme =>({
    root: {
        flexGrow: 1,
        textAlign:'center'
    },
    menutitle:{
        color:"#fff",
        'font-weight':'bold',
        marginLeft:10,
        [theme.breakpoints.down('xs')]: {
            marginLeft:'17%',
            'font-size':'20px'

        }

    }
});

function SimpleAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar elevation={5} position="static" style={{backgroundColor:"#1A936F"}}>
                <Toolbar>
                    <MenuIcon/>
                    <Typography variant="title" className={classes.menutitle} align={"center"}>
                        FOOTBALL TINDER
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);