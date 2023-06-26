import { useState } from "react";
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	Select,
	TextField,
} from "@material-ui/core";

const BusinessForm = () => {
	const [form, setForm] = useState({
		name: "",
		image: null,
		description: "",
		phoneNumber: "",
		hasWhatsapp: false,
		location: { lat: "", lon: "" },
		openingHours: [{ day: "", start: "", end: "" }],
		categoryName: "",
		subCategoryName: "",
	});

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

	const handleSubmit = (event) => {
		event.preventDefault();
		// Here you would call the API to submit your form
		console.log(form);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Grid container direction="column" alignItems="center" spacing={2}>
				<Grid item xs={12}>
					<TextField
						label="Category Name"
						name="categoryName"
						variant="outlined"
						onChange={handleInputChange}
						fullWidth
					/>

					<TextField
						label="Sub Category Name"
						name="subCategoryName"
						variant="outlined"
						onChange={handleInputChange}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Name"
						name="name"
						variant="outlined"
						onChange={handleInputChange}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						label="Description"
						name="description"
						variant="outlined"
						onChange={handleInputChange}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						label="Phone Number"
						name="phoneNumber"
						variant="outlined"
						onChange={handleInputChange}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12}>
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
									{/* ... Days of the week options ... */}
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
