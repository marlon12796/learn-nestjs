import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ZodValidationPipe } from './pipes/ZodValidationPipe';
import {
  CreatePropertySchema,
} from './dto/createPropertyZod';
import { PropertyService } from './service/property.service';
import { PaginationDTO } from './dto/pagination.dto';
@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}
  @Get('')
  async findAll(@Query() paginationDTO: PaginationDTO) {
    return this.propertyService.findAll(paginationDTO); 
  }
  @Get(':id')
  async getPropertyById(
    @Param('id', ParseIntPipe) id,
  ) {
    return this.propertyService.findOne(id)
  }
  @Post()
  @UsePipes(new ZodValidationPipe(CreatePropertySchema))
  async create(@Body() body: CreatePropertyDto) {
    return this.propertyService.create(body)
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id,
    @Body() body: CreatePropertyDto,
    // @RequestHeader(new ValidationPipe({ whitelist: true,validateCustomDecorators:true })) headers: HeadersDto,
  ) {
    return this.propertyService.update(id,body)
  }
  @Delete(":id")
  delete( @Param('id', ParseIntPipe) id,) {
    return  this.propertyService.delete(id)
  }
}
