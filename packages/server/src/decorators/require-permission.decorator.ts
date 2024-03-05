import { SetMetadata } from '@nestjs/common'

export const REQUIRE_PERMISSION_KEY = 'require-permission'
/**
 * 要求权限
 */
export const RequirePermission = (...permissions: string[]) =>
  SetMetadata(REQUIRE_PERMISSION_KEY, permissions)
