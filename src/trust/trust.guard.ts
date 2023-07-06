import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { JwtAppModule } from './jwt.module';

@Injectable()
export class TrustGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, 'asndnashjdajskdnjasndjkasndjksa');
      return true;
    } catch (err) {
      return false;
    }
  }
}
