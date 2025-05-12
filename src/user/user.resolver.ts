import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AppUser } from './entities/app-user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  getUser() {
    return 'user';
  }

  @Mutation(() => AppUser)
  createUser(@Args('createUserInput') createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto)
    return this.userService.create(createUserDto);
  }
}
