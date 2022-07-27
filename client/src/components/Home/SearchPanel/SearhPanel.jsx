import React, { useState } from "react";
import { AppBar, TextField, Button } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPostsBySearch } from "../../../actions/posts";
import ChipInput from "material-ui-chip-input";

const SearchPanel = ({tags, setTags}) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(`,`)}`
      );
    } else {
      history.push("/");
    }
  };
  return (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
      <TextField
        name="search"
        variant="outlined"
        label="Search Memories"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <ChipInput
        style={{ margin: `10px 0` }}
        value={tags}
        onAdd={handleAdd}
        onDelete={handleDelete}
        label="Search Tags"
        variant="outlined"
      />
      <Button
        onClick={searchPost}
        className={classes.searchButton}
        color="primary"
        variant="contained"
      >
        search
      </Button>
    </AppBar>
  );
};

export default SearchPanel;
