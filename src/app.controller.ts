import { Body, Controller, Get, Post, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map, } from 'rxjs';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Sse('updates')
  sse(): Observable<MessageEvent> {
    return interval(10000).pipe(map((_) => ({ data: { hello: 'world' } }) as MessageEvent));
  }
}
