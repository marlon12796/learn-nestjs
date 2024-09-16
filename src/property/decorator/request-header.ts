import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export const RequestHeader = createParamDecorator(async (targetDto:any, ctx: ExecutionContext) => {
  const headers = ctx.switchToHttp().getRequest().header
  const dto = plainToInstance(targetDto, headers, {
    excludeExtraneousValues: true,
  })
  await validateOrReject(dto)
  return dto;
})