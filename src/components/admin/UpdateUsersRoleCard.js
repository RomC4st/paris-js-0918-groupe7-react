import React, { Component } from "react";
import axios from "axios";
import SimpleTable from './SimpleTable';
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./DownloadCard.css";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import arrow from "../../images/left-arrow.png"


const styles = theme => ({
  companyContainer: {
    width: 300
  }
});

class UpdateUsersRoleCard extends Component {
  state = {
    users: [],
    roles: ["client", "admin", "super_admin"],
    role: "",
    selectedUsers: [],
    token: localStorage.getItem("token"),
    adminHomePage: false,
    refresh: false
  };

  getExtonUsers = () => {
    const company="Exton"

    axios({
      method: "GET",
      url: `http://localhost:3002/users/companyUsers=${company}`,
      headers: {
        authorization: `Bearer ${this.state.token}`
      }
    }).then(res => this.setState({ users: res.data }));
  };

  componentDidMount = () => {
   this.getExtonUsers();
  };

  handleChangeRole = event => {
    this.setState({ role: event.target.value })
  };

  selectingUsers = (array) => {
    this.setState({ selectedUsers: array })
  };

  disableRefresh = () => {
    this.setState({refresh: false})
  };

  handleBack = e => {
    this.setState({
      adminHomePage: true
    });
  };

  handleValidate = () => {
    let promises = [];

    this.state.selectedUsers.map(selectedUser => {
      const promise = axios({
        method: "PUT",
        url: `http://localhost:3002/users/${selectedUser}`,
        headers: {
          authorization: `Bearer ${this.state.token}`
        },
        data: {
          role: this.state.role
        }
      })
      .then(res => res);

      promises.push(promise)
      return 0
    })

    Promise.all(promises)
    .then( (res) => {
      this.getExtonUsers();
    })
    .then(() => this.setState({refresh: true, role: ""}))
  };

  render() {
    if(this.state.users.length === 0)
      return <div className='circular'> <CircularProgress disableShrink size="120px"/> </div>;
    const { classes } = this.props;
    if (this.state.adminHomePage) return <Redirect to="/admin" />;

    if (this.state.companies === null) return <div className='circular'> <CircularProgress disableShrink size="40px"/> </div>;
    return (
      <div>
        <Card
          className="card"
          style={{
            width: "80%",
            maxHeight: "70%",
            alignContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "5%",
            marginBottom: "auto",
            borderRadius: "10px",
          }}
        >

            <Button style={{ fontSize: "calc(0.4vw + 0.4vh + 0.6vmin)", padding: "2%"}}
            onClick={this.handleBack}>
            <img className="arrow" src={arrow} alt="back arrow"/>
              Back
          </Button>

          <Grid style={{ padding:"0 5%"}}>
            <SimpleTable users={this.state.users} selectingUsers={this.selectingUsers} refresh={this.state.refresh} disableRefresh={this.disableRefresh}/>
            <TextField
              className={classes.poleContainer}
              select
              value={this.state.role}
              onChange={this.handleChangeRole}
              label="Please select a new role"
              margin="normal"
            style={{fontSize: "calc(0.55vw + 0.55vh + 0.55vmin)", width: "30%" }}

            >
              {this.state.roles.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>

            <CardContent style={{ float: "right" }}>
              <Button
                className="BtnSend"
                type="submit"
                onClick={this.handleValidate}
                style={{
                  backgroundColor: "rgb(186, 28, 58)",
                  color: "white",
                  fontFamily: "Raleway",
                  borderRadius: "15px",
                  margin:"5% 2% 0 0",
                }}
                >
                <Typography
                  gutterBottom
                  style={{
                    textAlign: "center",
                    alignItems:"center",
                    color: "white",
                    fontSize: "calc(0.4vw + 0.4vh + 0.6vmin)",
                    padding: "8px 20px",
                    fontFamily: "Raleway",
                  }}
                  >
                  Validate
                </Typography>
              </Button>
            </CardContent>

            {/* <h3 style={{
                textAlign: "center",
                alignItems:"center",
                fontSize: "calc(0.55vw + 0.55vh + 0.55vmin)",
                margin: "5% 0"}}>* Don't forget to refresh your page after your changes</h3> */}
        </Grid>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(UpdateUsersRoleCard);
