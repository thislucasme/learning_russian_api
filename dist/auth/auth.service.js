"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const user_schema_1 = require("./entities/user.schema");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService, userModel) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async create(createUserTdo) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserTdo.password, salt);
        createUserTdo.password = hashedPassword;
        const createdUser = new this.userModel(createUserTdo);
        return createdUser.save();
    }
    login(user) {
        const userTdo = user.user;
        const payload = {
            sub: userTdo.id,
            email: userTdo.email,
            name: userTdo.name,
            uuid: userTdo.id
        };
        const jwtToken = this.jwtService.sign(payload);
        return {
            acess_token: jwtToken
        };
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.UnauthorizedException('Email or password is incorrect.');
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Email or password is incorrect.');
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map