import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseAuthGuard } from './auth/firebase-auth.guard';
import { RestaurantPrismaService } from './prisma/restaurant-prisma.service';
import { TenantPrismaService } from './prisma/tenant-prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
import { RolesGuard } from './auth/roles.guard';
import { RestaurantGuard } from './auth/restaurant.guard';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [
    RestaurantModule,
    UserModule,
    OwnerModule,
    FirebaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RestaurantGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    TenantPrismaService,
    RestaurantPrismaService,
  ],
})
export class AppModule {}
