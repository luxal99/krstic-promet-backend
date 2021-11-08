import { Injectable } from '@nestjs/common';
import {GenericService} from "../../util/generic/generic.service";
import {UserRepository} from "../../repository/UserRepository";
import {User} from "../../entities/User";
import {ChangePasswordDto} from "../../models/ChangePasswordDto";

@Injectable()
export class UserService extends GenericService<User> {
    constructor(private userRepository: UserRepository) {
        super(userRepository, []);
    }

    async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
        await this.userRepository.update(changePasswordDto.username, {
            password: changePasswordDto.password,
        });
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({ username });
    }
}
