export enum ErrorMessagesApi {
	EmailNotRecongizedInSystem = "Sorry, we couldn’t find an account with that username.",
	IncorrectPassword = "Incorrect password",
	PasswordsDontMatch = "Passwords don't match",
	UserAlreadyExists = "User already exists",
	UserDoesNotExists = "User does not exists",
	BusinessAlreadyExists = "Business already exists",
	BusinessDoesNotExists = "Business does not exists",
	NotValidPassword = "Password must be at least 8 characters long.",
	NotValidEmail = "Please use a valid email format.",
	FailedSingingOut = "failed signing out",
	CompanyDoesntExist = "company doesnt exist",
	CompanyAlreadyHaveApiKey = "company already have api key",
	CompanyDoesntHaveApiKey = "company doesnt have api key",
	UserIsNotRelatedToCompany = "user is not related to company",
	UserDoesntHaveCompany = "User doesnt have company",
	UserDoesntHaveAccessToProject = "User doesnt have access to project",
	ProjectDoesntExist = "project doesnt exist",
	NoActivitiesFound = "no activities found",
	InvalidPhoneNumber = "Invalid Phone Number",
	invalidOtpCode = "invalid otp code",
}
