import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import {
  CreateRequest,
  UpdateRequest,
} from 'firebase-admin/lib/auth/auth-config';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(this.configService.get<string>('FIREBASE_SERVICE_ACCOUNT'))
        ),
      });
    }
  }

  getAuth() {
    return admin.auth();
  }

  createUser(properties: CreateRequest) {
    return this.getAuth().createUser(properties);
  }

  updateUser(uid: string, properties: UpdateRequest) {
    return this.getAuth().updateUser(uid, properties);
  }

  getUser(uid: string) {
    return this.getAuth().getUser(uid);
  }

  getUserByEmail(email: string) {
    return this.getAuth().getUserByEmail(email);
  }

  getFirestore() {
    return admin.firestore();
  }
}
