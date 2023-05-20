import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { CreateBusiness } from './dto/createBusiness.dto';
import { UpdateBusiness } from './dto/updateBusiness.dto';

@ApiTags('business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }

  @Get()
  findBusinessesWithCategoryNames() {
    return this.businessService.findBusinessesWithCategoryNames();
  }

  @Post()
  create(@Body() createBusinessDto: CreateBusiness) {
    return this.businessService.create(createBusinessDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusiness) {
    return this.businessService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.businessService.delete(id);
  }
}
