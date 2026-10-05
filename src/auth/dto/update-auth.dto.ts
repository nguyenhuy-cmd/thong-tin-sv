import { PartialType } from '@nestjs/mapped-types';
import { CreateRegisterDto } from './create-auth.dto.js';

export class UpdateAuthDto extends PartialType(CreateRegisterDto) {}
