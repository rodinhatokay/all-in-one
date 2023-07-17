import { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

// eslint-disable-next-line react/prop-types
export const WeekOpeningHours = ({ onChange }) => {
  const [openingHours, setOpeningHours] = useState([
    { day: "Sunday", isOpen: true, hours: [] },
    { day: "Monday", isOpen: true, hours: [] },
    { day: "Tuesday", isOpen: true, hours: [] },
    { day: "Wednesday", isOpen: true, hours: [] },
    { day: "Thursday", isOpen: true,  hours: [] },
    { day: "Friday", isOpen: true,  hours: [] },
    { day: "Saturday", isOpen: true,  hours: [] },
  ]);

  const handleOpeningHourChange = (dayIndex, hourIndex, field, value) => {
    const updatedOpeningHours = [...openingHours];
    updatedOpeningHours[dayIndex].hours[hourIndex][field] = value;
    setOpeningHours(updatedOpeningHours);
    onChange(updatedOpeningHours);
  };

  const handleIsOpenChange = (dayIndex, value) => {
    const updatedOpeningHours = [...openingHours];
    updatedOpeningHours[dayIndex].isOpen = value;
    if (!value) {
      // Clear the hours when marking as closed
      updatedOpeningHours[dayIndex].hours = [];
    }
    setOpeningHours(updatedOpeningHours);
    onChange(updatedOpeningHours);
  };

  const handleAddOpeningHour = (dayIndex) => {
    const updatedOpeningHours = [...openingHours];
    updatedOpeningHours[dayIndex].hours.push({ start: "", end: "" });
    setOpeningHours(updatedOpeningHours);
    onChange(updatedOpeningHours);
  };

  return (
    <Grid container spacing={2}>
      {openingHours.map((openingHour, dayIndex) => (
        <Grid item xs={12} key={dayIndex}>
          <Typography variant="h6">{openingHour.day}</Typography>

          <Grid container alignItems="center">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={openingHour.isOpen}
                    onChange={(e) =>
                      handleIsOpenChange(dayIndex, e.target.checked)
                    }
                  />
                }
                label="Open"
              />
            </Grid>
            {openingHour.isOpen && (
              <Grid item xs={12}>
                {openingHour.hours.map((hour, hourIndex) => (
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    key={hourIndex}
                  >
                    <Grid item xs={4}>
                      <TextField
                        label="Start Hour"
                        value={hour.start}
                        onChange={(e) =>
                          handleOpeningHourChange(
                            dayIndex,
                            hourIndex,
                            "start",
                            e.target.value
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Closing Hour"
                        value={hour.end}
                        onChange={(e) =>
                          handleOpeningHourChange(
                            dayIndex,
                            hourIndex,
                            "end",
                            e.target.value
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleAddOpeningHour(dayIndex)}
                >
                  Add Opening Hour
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeekOpeningHours;
