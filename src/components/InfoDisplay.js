import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';

import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';


import Timestamp from 'react-timestamp';

import BetPlacer from './BetPlacer';
import ButtonNav from './ButtonNav.js';

const styles = theme =>({
    root:{
        width:'98%',
        flexGrow:1
    },
    appBar: {
        position: 'relative',
    },
    infoContainer:{
        [theme.breakpoints.down('lg')]: {
            marginLeft:10,
            marginTop:20
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft:-5,
            marginTop:5
        }
    },
    imgstyle:{
        [theme.breakpoints.down('xs')]: {
            width:100,
            height:100
        }
    },
    paperwrapper:{
        [theme.breakpoints.down('xs')]: {
            paddingLeft:10,
            paddingRight:10
        }
    },
    paper:{
        width:'50%',
        height:'100%'
    }


})

class InfoDisplay extends React.Component{
    timer = null;

    state={
        results:[],
        odds:[],
        eventID:"",
        completed:0,
        open:false

    };




    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.betsapi.com/v2/events/upcoming?sport_id=1&token=8984-1OAGIlKV4MjR92&league_id=8538`)
            .then(res => {
                const results = res.data.results;
                this.setState({ results });
            });

    };


    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    render() {
        const {classes}=this.props;

        return (

        <div className={classes.root}>

            <Grid container spacing={16} className={classes.infoContainer}  justify={"center"}>
                {this.state.results.map( results =>

                <Grid item lg={4} xs={11} >


                    <Paper elevation={6} style={{backgroundColor:"#1A936F"}}>
                        <Grid justify={"center"} container style={{paddingTop:10, marginBottom:20}}>
                            <Grid item  lg={12} style={{paddingTop:5, paddingBottom:5}}>
                                <Paper square={true} style={{width:'100%'}}><Typography className={classes.paperwrapper} variant="headline" style={{color:"#1A936F",'font-weight':'bold'}}>{results.league.name.toUpperCase()}</Typography></Paper>
                            </Grid>
                            <Grid item lg={10} xs={10} style={{paddingBottom:5}}>
                                <Typography variant="body2"style={{color:"#fff"}}>{results.extra.stadium_data.name}, {results.extra.stadium_data.city}, {results.extra.stadium_data.country.toUpperCase()}</Typography>
                            </Grid>
                            <Grid item lg={11} xs={10} style={{marginTop:5, marginBottom:5}}>
                                <Divider style={{backgroundColor:"#fff"}}/>
                            </Grid>
                        </Grid>
                        <Grid container justify={"center"}  direction={"row"}>
                            <Grid item lg={6} xs={6}>
                                <Paper square={true}><Typography className={classes.smallwrapper} variant="title" style={{color:"#1A936F"}} >{results.home.name.toUpperCase()}</Typography></Paper>
                                <img className={classes.imgstyle} height={130} width={130} src={'https://assets.b365api.com/images/team/b/'+results.home.image_id+'.png'}/>

                            </Grid>
                            <Grid item lg={6} xs={6}>
                                <Paper square={true}><Typography className={classes.smallwrapper} variant="title" style={{color:"#1A936F"}}>{results.away.name.toUpperCase()}</Typography></Paper>
                                <img className={classes.imgstyle} height={130} width={130} src={'https://assets.b365api.com/images/team/b/'+results.away.image_id+'.png'}/>
                            </Grid>

                            <Grid item lg={8} xs={10}>
                                <Divider style={{backgroundColor:"#fff"}}/>
                            </Grid>
                            <Grid item lg={8} xs={8} style={{marginTop:10,marginBottom:10}}>
                                <Paper sqaure={true}><Typography variant="subheading" style={{color:"#1A936F"}}><Timestamp time={results.time} format='full'/></Typography></Paper>
                            </Grid>
                            <Grid item lg={8} xs={10} style={{marginBottom:20}}>
                                <Divider style={{backgroundColor:"#fff"}}/>
                            </Grid>
                            <Grid item lg={10} xs={10}>
                                <ButtonNav check={results.id}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                )}
            </Grid>
         </div>
        );
    }


}

InfoDisplay.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(InfoDisplay);