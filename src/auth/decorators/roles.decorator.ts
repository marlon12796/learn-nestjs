import { SetMetadata } from '@nestjs/common';
import {type Role } from '../enum/role';
export const ROLES_KEY='roles'
export const Roles = (...args: [Role,...Role[]]) => SetMetadata(ROLES_KEY, args);
