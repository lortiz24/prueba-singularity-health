import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AppUser } from './entities/app-user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => AppUser)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  getUser() {
    return 'user';
  }

  @Mutation(() => AppUser)
  async createUser(
    @Args('createUserInput') createUserDto: CreateUserDto,
  ): Promise<AppUser> {
    const user = await this.userService.create(createUserDto);
    return user;
  }
}
