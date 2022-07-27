import { Container, Grid, Grow, Paper } from "@material-ui/core";
import React, { useState } from "react";
import Form from "../Form/Form";
import Paginate from "../Paginate";
import Posts from "../Posts/Posts";
import useStyles from "./styles";
import { useLocation } from "react-router-dom";
import SearchPanel from "./SearchPanel/SearhPanel";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [tags, setTags] = useState([]);
  const classes = useStyles();

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SearchPanel tags={tags} setTags={setTags}/>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length ? (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
