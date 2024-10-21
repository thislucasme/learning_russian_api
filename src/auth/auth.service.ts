import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { User, UserDocument } from './entities/user.schema';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { CreateUserTdo } from './tdo/createUserTdo';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		@InjectModel(User.name) private userModel: Model<UserDocument>
	) { }
	async create(createUserTdo: CreateUserTdo): Promise<User> {
		const salt = await bcrypt.genSalt();
		const hashedPassword  = await bcrypt.hash(createUserTdo.password, salt)
		createUserTdo.password = hashedPassword; 

		const createdUser = new this.userModel(createUserTdo);
		return createdUser.save();
	}
	login(user: any): UserToken {
		const userTdo: UserDocument = user.user;
		const payload: UserPayload = {
			sub: userTdo.id,
			email: userTdo.email,
			name: userTdo.name,
			uuid: userTdo.id
		};
		const jwtToken = this.jwtService.sign(payload);
		return {
			acess_token: jwtToken
		}
	}

	async validateUser(email: string, password: string) {
		const user: UserDocument = await this.userModel.findOne({ email }).exec()
		if (!user) {
			throw new UnauthorizedException('Email or password is incorrect.');
		  }
		const isPasswordMatching = await bcrypt.compare(password, user.password);
		if (!isPasswordMatching) {
		  throw new UnauthorizedException('Email or password is incorrect.');
		}

		return user;
	}
}
