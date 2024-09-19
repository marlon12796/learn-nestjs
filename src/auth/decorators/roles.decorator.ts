import { SetMetadata } from '@nestjs/common';
import {type  Role } from '../enum/role';

export const Roles = (...args: [Role,...Role[]]) => SetMetadata('roles', args);
