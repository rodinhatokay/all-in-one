import { View, StyleSheet } from "react-native";
import BusinessCategories from "../sections/Home/BusinessCategories/BusinessCategories";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";

const HomeScreen = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	if (loading) return <Loader />;
	return (
		<View style={styles.main}>
			<BusinessCategories />
		</View>
	);
};
const styles = StyleSheet.create({
	main: { flex: 1 },
});

export default HomeScreen;
