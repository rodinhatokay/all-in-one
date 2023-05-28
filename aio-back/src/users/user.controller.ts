import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from '../common/decorators/user.decorator';
import { User as UserType } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/current-user')
	async findOneByToken(@User() user: UserType) {
		return await this.userService.findOne(user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.userService.findOne(id);
	}
}
