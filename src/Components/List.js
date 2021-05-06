import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Myphoto = () => {
  const [data, setData] = useState([]);

  const getImageList = () => {
    axios
      .get(`${global.url}/api/image`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    getImageList();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <h1>Grasp Teaching</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: 30,
          alignItems: "center",
        }}
      >
        <Button variant="outlined">
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/Add",
            }}
          >
            Add Image
          </Link>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          margin: 10,
          padding: 10,
          justifyContent: "space-evenly",
          marginTop: 100,
        }}
      >
        {data.map((a, index) => {
          return (
            <Card
              key={index}
              style={{ paddingBottom: "10px", width: "100rem", margin: 10 }}
              display="flex"
              alignItems="center"
              className={classes.root}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Dogs"
                  height="140"
                  src={`${global.url}${a.ImageUrl}`}
                  title="Contemplative Reptile"
                />
                <Card>{a.lableName}</Card>
              </CardActionArea>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: 10,
                }}
              >
                <Button variant="outlined" size="small" color="primary">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={{
                      pathname: "/Edit",
                      state: { ...a, option: "preview" },
                    }}
                  >
                    preview
                  </Link>
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Myphoto;
