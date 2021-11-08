import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {UserRepository} from "../../repository/UserRepository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {
}
