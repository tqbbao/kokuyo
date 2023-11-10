import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('---Interceptor(Một...');

    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        console.log('---Interceptor(Ba...');
        console.log("message: ", data.message);
        console.log("data: ", data.data);
        console.log("actorId: ", data.data['actorId']);

      }),
      
    );
  }
}
