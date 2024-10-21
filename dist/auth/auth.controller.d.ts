import { AuthService } from './auth.service';
import { UsuarioLogin } from 'src/tdo/usuarioDTO';
import { CreateUserTdo } from './tdo/createUserTdo';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: UsuarioLogin): import("./models/UserToken").UserToken;
    signup(createUserDto: CreateUserTdo): Promise<import("./entities/user.schema").User>;
}
