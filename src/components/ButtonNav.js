import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const styles = theme =>({
    root: {
        flexGrow: 1,
    },

    buttonstyle:{
        [theme.breakpoints.down('xs')]: {
            'font-size':'9px',
            'font-weight':'bold',
        }

    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
};

class ButtonNav extends React.Component {
    state={
        results:[],
        open:false,
        amount:0
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://api.betsapi.com/v1/event/odds?token=8984-1OAGIlKV4MjR92&source=bet365&odds_market=1&event_id='+this.props.check)
            .then(res => {
                var results = res.data.results['1_1'][0];
                this.setState({ results });
            });
    }
    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container  spacing={8} style={{marginBottom:20}} justify={"center"} >
                    <Grid item>
                <Button onClick={this.handleClickOpen} style={{backgroundColor:"#F3E9D2",color:"#1A93F"}} variant="extendedFab" aria-label="delete" className={classes.buttonstyle}>
                    WIN: {this.state.results.home_od}
                </Button>
                    </Grid>
                    <Grid item>
                <Button onClick={this.handleClickOpen} style={{backgroundColor:"#C6DABF",color:"#1A93F"}} variant="extendedFab" aria-label="delete" className={classes.buttonstyle}>
                    DRAW: {this.state.results.draw_od}
                </Button>
                    </Grid>
                    <Grid item>
                <Button onClick={this.handleClickOpen} style={{backgroundColor:"#88D498",color:"#1A93F"}} variant="extendedFab" aria-label="delete" className={classes.buttonstyle}>
                    LOSE: {this.state.results.away_od}
                </Button>
                    </Grid>
                </Grid>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="form-dialog-title" style={{"text-align":'center'}}>PLACE BET</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send
                            updates occasionally.
                        </DialogContentText>
                        <TextField
                            id="number"
                            label=""
                            value={this.state.amount}
                            onChange={this.handleChange('amount')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                        <TextField
                            id="number"
                            label=""
                            value={this.state.amount}
                            onChange={this.handleChange('amount')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                        <TextField
                            id="number"
                            label=""
                            value={this.state.amount}
                            onChange={this.handleChange('amount')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Place Bet
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };
}

ButtonNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonNav);