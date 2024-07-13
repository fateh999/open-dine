import { Module } from '@nestjs/common';
import { ImagekitController } from './imagekit.controller';

@Module({
  controllers: [ImagekitController],
})
export class ImagekitModule {}
