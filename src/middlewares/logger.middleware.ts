import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export class LoggerMiddleware implements NestMiddleware {

  use(request: Request, response: Response, next: NextFunction) {

    console.log('logger...');
    console.log(request.ip);
    console.log(request.path);
    


    next(); // let the request pass the middleware
  }
}