import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10)
    if (val <= 0) throw new BadRequestException("id must be possitive")
   if(isNaN(val)) throw new BadRequestException("id must be number")
    return val;
  }
}