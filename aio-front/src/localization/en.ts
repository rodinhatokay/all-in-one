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
	enterYourPhoneNumberWeWillSendXDigitsVerificationCode: `enter your phone number we will send ${OTP_LENGTH} digits verification code`,
	phoneNumber: "phone number",
	getVerificationCode: "get verification code",
	enterTheCodeSentTo: "enter the code sent to",
	didntReceiveOtp: "didnt receieve code?",
	verifyAndContinue: "verify & continue",
	verificationCode: "verification code",
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
