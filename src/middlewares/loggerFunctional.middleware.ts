import { NextFunction, Request, Response } from "express";

export function logger(request: Request, response: Response, next: NextFunction) {

  console.log('logger...');
  console.log(request.ip);
  console.log(request.path);



  next(); // let the request pass the middleware
}