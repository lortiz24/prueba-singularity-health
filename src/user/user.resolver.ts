import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AppUser } from './entities/app-user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => AppUser)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => AppUser)
  async getUser(@Args('id', { type: () => ID }) id: string): Promise<AppUser> {
    return this.userService.findOne(id);
  }

  @Mutation(() => AppUser)
  async createUser(
    @Args('createUserInput') createUserDto: CreateUserDto,
  ): Promise<AppUser> {
    const user = await this.userService.create(createUserDto);
    return user;
  }
}
