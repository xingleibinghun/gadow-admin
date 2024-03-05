import {
  Controller,
  Post,
  Body,
  Request,
  UsePipes,
  ValidationPipe,
  UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './auth.dto'
import { LocalAuthGuard } from './local-auth.guard'
import { NoLoginRequired } from '@/decorators/no-login-required.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * sign in
   */
  @Post('signin')
  @NoLoginRequired()
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signIn(@Body() dto: SignInDto, @Request() req) {
    return await this.authService.signIn(req.user)
  }

  /**
   * refresh token
   */
  @Post('refresh')
  @NoLoginRequired()
  async refresh(@Body('refresh_token') refreshToken: string) {
    return await this.authService.refresh(refreshToken)
  }
}
