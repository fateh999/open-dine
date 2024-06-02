import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OwnerService } from './owner.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { Tenant } from '../auth/tenant.decorator';
import { SyncOwnerInput } from './dto/sync-owner.input';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { Public } from '../auth/public.decorator';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly tenantPrismaService: TenantPrismaService
  ) {}

  @Public()
  @Tenant()
  @Mutation(() => Owner)
  async createTestOwnerAndRestaurant() {
    return this.createOwnerAndRestaurant(
      {
        displayName: 'Super Admin',
        email: 'superadmin@openmenu.com',
        password: '12345678Om*',
      },
      {
        name: 'Restaurant',
        slug: 'restaurant',
      }
    );
  }
  /*TODO: After MVP, we need to create this a mutation so users can create restaurants through a web app after payment*/
  private async createOwnerAndRestaurant(
    @Args('createOwnerInput') createOwnerInput: CreateOwnerInput,
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput
  ) {
    const firebaseUser = await this.ownerService.createOrFindInFirebase(
      createOwnerInput
    );
    const syncUserInput: SyncOwnerInput = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      disabled: firebaseUser.disabled,
      photoUrl: firebaseUser.photoURL,
    };
    const owner = await this.ownerService.syncOwner(syncUserInput);
    const dbName = createRestaurantInput.slug;
    const newDbUrl = `postgresql://devuser:devpass@localhost:5432/${dbName}`;

    const prismaSchemaPath = path.resolve(
      __dirname,
      './prisma/restaurant/restaurant-schema.prisma'
    );

    await execAsync(
      `npx prisma migrate deploy --schema=${prismaSchemaPath} --preview-feature`,
      {
        env: {
          ...process.env,
          RESTAURANT_DATABASE_URL: newDbUrl,
        },
      }
    );

    await this.tenantPrismaService.restaurant.create({
      data: {
        ...createRestaurantInput,
        port: parseInt(process.env.POSTGRES_PORT),
        host: process.env.POSTGRES_HOST,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        owner: {
          connect: {
            id: owner.id,
          },
        },
      },
    });
    return owner;
  }
}
