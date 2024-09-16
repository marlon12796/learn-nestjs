import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';
import { PropertyService } from './service/property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property} from 'src/entities/property.entity';

@Module({
  controllers: [PropertyController],
  providers: [{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      always: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  }, PropertyService],
  imports:[TypeOrmModule.forFeature([Property])]
})
export class PropertyModule {}
