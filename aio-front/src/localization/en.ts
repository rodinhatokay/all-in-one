import { OTP_LENGTH } from "../services/otp/otp.util";

const en = {
	aio: "AiO",
	allInOne: "All in One",
	appearances: "Appearances",
	logOut: "Log Out",
	areYouSureYouWantToLogOut: "Are you sure you want to log out?",
	yes: "Yes",
	no: "No",
	english: "English",
	hebrew: "עברית",
	arabic: "عربي",
	login: "login",
	hello: "hello",
	signIn: "sign in",
	register: "Register",
	username: "user name",
	password: "password",
	loading: "loading...",
	enter_your_phone_number_we_will_send_x_digits_verification_code: `enter your phone number we will send ${OTP_LENGTH} digits verification code`,
	phoneNumber: "phone number",
	get_verification_code: "get verification code",
	enter_the_code_sent_to: "enter the code sent to",
	didnt_receive_otp: "didnt receieve code?",
	verify_and_continue: "verify & continue",
	verification_code: "verification code",
	home: "Home",
	business: "Business",
	search: "Search",
	favorites: "Favorites",
	noFavoritesYetStartAddingSome: "No favorites yet. Start adding some!",
	pleaseAccpetTheTermsAndConditionsToProceed:
		"Please accept the terms and conditions to proceed.",
	iAgreeToThe: "I agree to the",
	termsAndConditions: "Terms and Conditions",
	pleaseEnterYourFirstName: "Please enter your first name.",
	pleaseEnterYourLastName: "Please enter your last name.",
	invalidPhoneNumber: "Invlaid phone number",
	invalidOtpCode: "Invalid code",
};

export type IEnTranslations = typeof en;

export default en;
