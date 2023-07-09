import { Transform, TransformFnParams } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class RegisterDto {
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	phoneNumber: string;

	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	firstName: string;

	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	lastName: string;

	@IsBoolean()
	@IsNotEmpty()
	@ValidateIf((val) => val === true, {
		message: "must provide acceptedTerms with value: true",
	})
	termsAccepted: boolean;
}
