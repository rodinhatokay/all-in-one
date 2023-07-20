import { useState, useEffect } from "react";

import { useAioBackClient } from "../context/AioBackContext";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { WeekOpeningHours } from "./WeekOpeningHours";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    margin: "20px",
  },
}));

const BusinessForm = () => {
  const [form, setForm] = useState({
    name: "",
    image: null,
    description: "",
    phoneNumber: "",
    hasWhatsapp: false,
    location: { lat: "", lon: "" },
    openingHours: [
      { day: "Sunday", isOpen: true, hours: [] },
      { day: "Monday", isOpen: true, hours: [] },
      { day: "Tuesday", isOpen: true, hours: [] },
      { day: "Wednesday", isOpen: true, hours: [] },
      { day: "Thursday", isOpen: true, hours: [] },
      { day: "Friday", isOpen: true, hours: [] },
      { day: "Saturday", isOpen: true, hours: [] },
    ],
    // categoryName: "",
    // subCategoryName: "",
    filePath: null,
    address: null,
    category: null,
  });

  const [categories, setCategories] = useState([]);

  const aioBackClient = useAioBackClient();
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await aioBackClient.getCategories();
        setCategories(response);
        // Handle the response here
      } catch (error) {
        // Handle any errors
      }
    };

    fetchData();
  }, [aioBackClient]);

  const handleOpeningHoursChange = (updatedOpeningHours) => {
    setForm({ ...form, openingHours: updatedOpeningHours });
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    if (name === "day" || name === "start" || name === "end") {
      let openingHours = [...form.openingHours];
      openingHours[index][name] = value;
      setForm({ ...form, openingHours });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCheckboxChange = () => {
    setForm({ ...form, hasWhatsapp: !form.hasWhatsapp });
  };

  const handleAddressChange = (event) => {
    setForm({ ...form, address: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setForm({ ...form, category: event.target.value });
  };

  const handleFileChange = (event) => {
    aioBackClient
      .uploadFile(event.target.files[0])
      .then((result) => {
        // Handle the result from the backend
        setForm({ ...form, filePath: result.url });
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    aioBackClient
      .createBusiness(form)
      .then((result) => {
        // Handle the result from the backend
        console.log(result);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              style={{ width: "200px" }}
              labelId="category-label"
              id="category"
              value={form.categoryId}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem
                  style={{ width: "200px" }}
                  key={category.id}
                  value={category}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {/* <Grid item xs={12} sm={2}>
            <TextField
              label="Category Name"
              name="categoryName"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Sub Category Name"
              name="subCategoryName"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
            />
          </Grid> */}

          <Grid item xs={12} sm={2}>
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
              error={
                !!form.phoneNumber &&
                !/^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
                  form.phoneNumber
                )
              }
              helperText={
                form.phoneNumber &&
                !/^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
                  form.phoneNumber
                )
                  ? "Invalid phone number"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="hasWhatsapp"
                  checked={form.hasWhatsapp}
                  onChange={handleCheckboxChange}
                />
              }
              label="Has Whatsapp"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              label="Latitude"
              name="location.lat"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              label="Longitude"
              name="location.lon"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <Button variant="contained" component="span">
              Select File
            </Button>
          </label>
          {form.filePath && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography>Selected file:</Typography>
              <div>filePath: {form.filePath}</div>
              <img
                src={form.filePath}
                alt="Selected File"
                style={{
                  maxWidth: "400px",
                  maxHeight: "400px",
                  marginLeft: "10px",
                }}
              />
            </div>
          )}
        </Grid>
        <Grid>
          <WeekOpeningHours onChange={handleOpeningHoursChange} />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BusinessForm;
