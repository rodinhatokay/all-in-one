import { useState } from "react";

import { useBusinessClient } from "../context/BusinessContext";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
  MenuItem,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    margin: "20px",
  },
}));

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const BusinessForm = () => {
  const [form, setForm] = useState({
    name: "",
    image: null,
    description: "",
    phoneNumber: "",
    hasWhatsapp: false,
    location: { lat: "", lon: "" },
    openingHours: [{ day: "", start: "", end: "" }],
    // categoryName: "",
    // subCategoryName: "",
    filePath: null,
  });
  const businessClient = useBusinessClient();
  const classes = useStyles();

  const addOpeningHour = () => {
    setForm({
      ...form,
      openingHours: [...form.openingHours, { day: "", start: "", end: "" }],
    });
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

  const handleFileChange = (event) => {
    businessClient
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
    businessClient
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

        <Grid container spacing={2} className={classes.root}></Grid>

        <Grid item xs={12}>
          <TextField
            label="Latitude"
            name="location.lat"
            variant="outlined"
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Longitude"
            name="location.lon"
            variant="outlined"
            onChange={handleInputChange}
            fullWidth
          />
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

        {form.openingHours.map((openingHour, index) => (
          <Grid
            container
            key={index}
            item
            xs={12}
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Day</InputLabel>
                <Select
                  name="day"
                  value={openingHour.day}
                  onChange={(event) => handleInputChange(event, index)}
                >
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Start Hour"
                name="start"
                variant="outlined"
                value={openingHour.start}
                onChange={(event) => handleInputChange(event, index)}
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="End Hour"
                name="end"
                variant="outlined"
                value={openingHour.end}
                onChange={(event) => handleInputChange(event, index)}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addOpeningHour}>
            Add Opening Hour
          </Button>
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
