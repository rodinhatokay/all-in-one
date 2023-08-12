import {
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from '../auth/types/jwt';
import { ErrorMessages } from '../common/errors/errorMessage';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/current-user')
	async findOneByToken(@User() user: JwtPayload) {
		const _user = await this.userService.findOne(user.userId);
		if (!_user) throw new NotFoundException(ErrorMessages.UserNotFound);
		return _user;
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const _user = await this.userService.findOne(id);
		if (!_user) throw new NotFoundException(ErrorMessages.UserNotFound);
		return _user;
	}

	@Delete(':id')
	@HttpCode(202)
	async deleteOne(@Param('id') id: string) {
		return await this.userService.deleteOne(id);
	}
}
