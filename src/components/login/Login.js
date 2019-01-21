import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import IntroImage from "../../images/intro_image.png";
import LoginCard from "./LoginCard";

import Hidden from '@material-ui/core/Hidden';

class Login extends Component {
  render() {
    return (
      <div>
        <Grid
          container
          className="gridthanks"
          style={{
            backgroundColor: "rgb(125, 146, 177)",
            position: "absolute",
            minHeight:"100%"
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              style={{
                textAlign: "center",
                justifyContent: "center",
                verticalAlign: "middle",
                color: "white",
                margin: "5% auto",
                fontFamily: "Raleway",
                fontSize: "calc(1.4vw + 1.4vh + 1.7vmin)" ,
              }}
              gutterBottom
            >
              {" "}
              Welcome to survey AAA
            </Typography>
            <LoginCard />
          </Grid>

          <Hidden only={['xs', 'sm']}>
            <Grid item xs={12} md={6}
              className="grid2"
              id="postit"
              style={{
                backgroundImage: `url(${IntroImage})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat"
              }}
            >
          </Grid>
        </Hidden>
        </Grid>
      </div>
    );
  }
}

export default Login;