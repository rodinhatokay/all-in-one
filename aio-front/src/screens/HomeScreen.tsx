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

	if (loading) return <Loader style={styles.loader} />;
	return (
		<View style={styles.main}>
			<BusinessCategories />
		</View>
	);
};
const styles = StyleSheet.create({
	main: { flex: 1 },
	loader: { alignSelf: "center", marginTop: 50 },
});

export default HomeScreen;
