import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(this.configService.get<string>('FIREBASE_SERVICE_ACCOUNT'))
      ),
    });
  }

  getAuth() {
    return admin.auth();
  }

  getFirestore() {
    return admin.firestore();
  }
}
