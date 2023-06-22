export class User {
	id: string;
	firstName?: string;
	lastName?: string;
	terms: boolean;
	phoneNumber?: string;
	isFullyRegistered: boolean;
}

export class JwtPayload {
	isUserRegistered: boolean;
	accessToken: string;
	user: User;
}
 