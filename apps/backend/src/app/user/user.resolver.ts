import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SyncUserInput } from './dto/sync-user.input';
import { User } from './entities/user.entity';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './entities/user-role.enum';
import { CreateUserInput } from './dto/create-user.input';
import { EditUserInput } from './dto/edit-user.input';
import { IsSuperAdmin } from '../common/decorators/is-super-admin.decorator';
import { FirebaseUser } from '../auth/firebase-user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { RestaurantSlug } from '../common/decorators/restaurant-slug.decorator';
import { PaginatedUsersResponse } from './dto/paginated-users.response';
import { PaginationArgs } from '../common/dto/pagination.args';
import { FilterArgs } from '../common/dto/filter.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN)
  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string, @RestaurantSlug() slug: string) {
    return this.userService.findOne(id, slug);
  }

  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Query(() => User, { nullable: true })
  async userProfile(
    @FirebaseUser() firebaseUser: UserRecord,
    @RestaurantSlug() slug: string,
    @IsSuperAdmin() isSuperAdmin: boolean,
  ) {
    if (isSuperAdmin) {
      return {
        id: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoUrl: firebaseUser.photoURL,
        disabled: firebaseUser.disabled,
        role: UserRole.SUPER_ADMIN,
      };
    }
    return this.userService.findOne(firebaseUser.uid, slug);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => PaginatedUsersResponse)
  async users(
    @Args() paginationArgs: PaginationArgs,
    @Args() filterArgs: FilterArgs,
    @RestaurantSlug() slug: string,
    @IsSuperAdmin() isSuperAdmin: boolean,
  ) {
    return this.userService.findAll(
      paginationArgs,
      filterArgs,
      slug,
      isSuperAdmin,
    );
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => User)
  async createStaffUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @RestaurantSlug() slug: string,
  ) {
    const firebaseUser =
      await this.userService.createOrFindInFirebase(createUserInput);
    const syncUserInput: SyncUserInput = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      disabled: firebaseUser.disabled,
      photoUrl: firebaseUser.photoURL,
    };
    return this.userService.sync(syncUserInput, slug);
  }

  @Mutation(() => User)
  async createAdminUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @RestaurantSlug() slug: string,
  ) {
    const firebaseUser =
      await this.userService.createOrFindInFirebase(createUserInput);
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
  async editStaffUser(
    @Args('editUserInput') editUserInput: EditUserInput,
    @RestaurantSlug() slug: string,
  ) {
    const firebaseUser =
      await this.userService.updateUserInFirebase(editUserInput);
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
  async deleteStaffUser(
    @Args('id') id: string,
    @RestaurantSlug() slug: string,
  ) {
    const user = await this.userService.findOne(id, slug);
    await this.userService.deleteUser(user.id, slug);
    await this.userService.deleteUserInFirebase(user.id);
    return user;
  }
}
