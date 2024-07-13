import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';
import { Public } from '../auth/public.decorator';
import { Tenant } from '../auth/tenant.decorator';

@Controller('imagekit')
export class ImagekitController {
  imagekit: ImageKit;

  constructor(private configService: ConfigService) {
    try {
      this.imagekit = new ImageKit({
        publicKey: this.configService.get<string>('IMAGEKIT_PUBLIC_KEY'),
        privateKey: this.configService.get<string>('IMAGEKIT_PRIVATE_KEY'),
        urlEndpoint: this.configService.get<string>('IMAGEKIT_URL_ENDPOINT'),
      });
    } catch (error) {
      console.log({ error });
    }
  }

  @Tenant()
  @Public()
  @Get()
  verify() {
    const authenticationParameters =
      this.imagekit.getAuthenticationParameters();
    return authenticationParameters;
  }
}
