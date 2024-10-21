import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { User, UserDocument } from './entities/user.schema';
import { UserToken } from './models/UserToken';
import { CreateUserTdo } from './tdo/createUserTdo';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private userModel;
    constructor(userService: UserService, jwtService: JwtService, userModel: Model<UserDocument>);
    create(createUserTdo: CreateUserTdo): Promise<User>;
    login(user: any): UserToken;
    validateUser(email: string, password: string): Promise<UserDocument>;
}
