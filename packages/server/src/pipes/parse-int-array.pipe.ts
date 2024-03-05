import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'

/**
 * 字符串转数字数组
 *  - 非必填
 */
@Injectable()
export class ParseIntArrayPipe implements PipeTransform<string, number[]> {
  transform(value: string): number[] {
    const arr = (value || '').split(',').filter(Boolean)
    const hasNaN = arr.some(Number.isNaN)
    if (hasNaN) throw new BadRequestException('Validation failed')
    return arr.map(Number)
  }
}
