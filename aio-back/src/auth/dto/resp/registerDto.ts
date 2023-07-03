import { User } from "../../../users/entities/user.entity";

export class RegisterResponseDto {
	access_token: string;
	user: User;
}
