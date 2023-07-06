import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Lógica de verificação de acesso aqui
    const request = context.switchToHttp().getRequest();
    // Exemplo: Verificar se o usuário está autenticado
    const isAuthenticated = !!request.user;

    return isAuthenticated; // Retornar true para acesso permitido, false para acesso negado
  }
}
