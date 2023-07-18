import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategory {
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	name: string;
}
