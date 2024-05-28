import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RestaurantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const restaurantSlug = req.headers['x-restaurant-slug'];
    if (!restaurantSlug) {
      res.status(400).send('Restaurant Slug is required');
      return;
    }
    req['restaurantSlug'] = restaurantSlug;
    next();
  }
}
