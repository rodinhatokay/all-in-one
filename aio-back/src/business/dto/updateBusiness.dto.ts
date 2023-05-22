import { IsString } from 'class-validator';
import { CreateBusiness } from './createBusiness.dto';

export class UpdateBusiness extends CreateBusiness {
  @IsString()
  id: string;
}
