import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { RestaurantSlug } from '../common/decorators/restaurant-slug.decorator';
import { Customer } from './entities/customer.entity';
import { UserRole } from '../user/entities/user-role.enum';
import { Roles } from '../auth/roles.decorator';
import { FirebaseUser } from '../auth/firebase-user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { SyncCustomerInput } from './dto/sync-customer.input';
import { PaginationArgs } from '../common/dto/pagination.args';
import { FilterArgs } from '../common/dto/filter.args';
import { PaginatedCustomersResponse } from './dto/paginated-customers.response';
import { EditCustomerInput } from './dto/edit-customer.input';

@Resolver()
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Roles(UserRole.ADMIN)
  @Query(() => Customer, { nullable: true })
  async customer(@Args('id') id: string, @RestaurantSlug() slug: string) {
    return this.customersService.findOne(id, slug);
  }

  @Mutation(() => Customer)
  async syncCustomer(
    @FirebaseUser() firebaseUser: UserRecord,
    @RestaurantSlug() slug: string,
  ) {
    const syncCustomerInput: SyncCustomerInput = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      disabled: firebaseUser.disabled,
      photoUrl: firebaseUser.photoURL,
    };
    return this.customersService.sync(syncCustomerInput, slug);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => PaginatedCustomersResponse)
  async customers(
    @Args() paginationArgs: PaginationArgs,
    @Args() filterArgs: FilterArgs,
    @RestaurantSlug() slug: string,
  ) {
    return this.customersService.findAll(paginationArgs, filterArgs, slug);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Customer)
  async editCustomer(
    @Args('editCustomerInput') editCustomerInput: EditCustomerInput,
    @RestaurantSlug() slug: string,
  ) {
    const firebaseUser =
      await this.customersService.updateUserInFirebase(editCustomerInput);
    const syncUserInput: SyncCustomerInput = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      disabled: firebaseUser.disabled,
      photoUrl: firebaseUser.photoURL,
    };
    return this.customersService.sync(syncUserInput, slug);
  }
}
