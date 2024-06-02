import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SyncUserInput } from './dto/sync-user.input';
import { PaginationArgs } from './dto/pagination.args';
import { FilterUserArgs } from './dto/filter-user.args';
import { User } from './entities/user.entity';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './entities/user-role.enum';
import { CreateUserInput } from './dto/create-user.input';
import { EditUserInput } from './dto/edit-user.input';
import { IsSuperAdmin } from '../common/decorators/is-super-admin.decorator';
import { FirebaseUser } from '../auth/firebase-user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { RestaurantSlug } from '../common/decorators/restaurant-slug.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string, @RestaurantSlug() slug: string) {
    return this.userService.findOne(id, slug);
  }

  @Mutation(() => User)
  async syncUser(
    @FirebaseUser() firebaseUser: UserRecord,
    @RestaurantSlug() slug: string
  ) {
    const syncUserInput: SyncUserInput = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      disabled: firebaseUser.disabled,
      photoUrl: firebaseUser.photoURL,
    };
    return this.userService.sync(syncUserInput, slug);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => [User])
  async users(
    @Args() paginationArgs: PaginationArgs,
    @Args() filterUserArgs: FilterUserArgs,
    @RestaurantSlug() slug: string,
    @IsSuperAdmin() isSuperAdmin: boolean
  ) {
    return this.userService.findAll(
      paginationArgs,
      filterUserArgs,
      slug,
      isSuperAdmin
    );
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => User)
  async createStaffUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @RestaurantSlug() slug: string
  ) {
    const firebaseUser = await this.userService.createOrFindInFirebase(
      createUserInput
    );
    const syncUserInput: SyncUserInput = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      disabled: firebaseUser.disabled,
      photoUrl: firebaseUser.photoURL,
    };
    return this.userService.sync(syncUserInput, slug, UserRole.STAFF);
  }

  @Mutation(() => User)
  async createAdminUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @RestaurantSlug() slug: string
  ) {
    const firebaseUser = await this.userService.createOrFindInFirebase(
      createUserInput
    );
    const syncUserInput: SyncUserInput = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      disabled: firebaseUser.disabled,
      photoUrl: firebaseUser.photoURL,
    };
    return this.userService.sync(syncUserInput, slug, UserRole.ADMIN);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => User)
  async editUser(
    @Args('editUserInput') editUserInput: EditUserInput,
    @RestaurantSlug() slug: string
  ) {
    const firebaseUser = await this.userService.updateUserInFirebase(
      editUserInput
    );
    const syncUserInput: SyncUserInput = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      disabled: firebaseUser.disabled,
      photoUrl: firebaseUser.photoURL,
    };
    return this.userService.sync(syncUserInput, slug);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => User)
  async editStaffUser(
    @Args('editUserInput') editUserInput: EditUserInput,
    @RestaurantSlug() slug: string
  ) {
    const firebaseUser = await this.userService.updateUserInFirebase(
      editUserInput
    );
    const syncUserInput: SyncUserInput = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      disabled: firebaseUser.disabled,
      photoUrl: firebaseUser.photoURL,
    };
    return this.userService.sync(syncUserInput, slug);
  }
}
