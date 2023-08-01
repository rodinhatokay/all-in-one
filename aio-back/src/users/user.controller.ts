import {
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from '../auth/types/jwt';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/current-user')
	async findOneByToken(@User() user: JwtPayload) {
		return await this.userService.findOne(user.userId);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.userService.findOne(id);
	}

	@Delete(':id')
	@HttpCode(202)
	async deleteOne(@Param('id') id: string) {
		return await this.userService.deleteOne(id);
	}
}
