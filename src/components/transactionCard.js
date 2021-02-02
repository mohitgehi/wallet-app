import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Transactions from "./transactions";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function UserDataCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  let name = props.transaction.nameTo;
  let amount;
  console.log(props.transaction);
  const username =
    props.userData.firstName + " " + props.userData.lastName + "";

  console.log(username, name);
  if (username === name) {
    name = props.transaction.nameFrom;
    console.log(1);
    console.log(name);
  }
  if (props.transaction.to === props.userData.number) {
    amount = "+" + props.transaction.amount;
  } else {
    amount = "-" + props.transaction.amount;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Name: {name}
        </Typography>

        <Typography variant="h5" component="h2">
          {amount}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.number}
        </Typography>
        <Typography variant="body2" component="p">
          {props.transaction.date}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
