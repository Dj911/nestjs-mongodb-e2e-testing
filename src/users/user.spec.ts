import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { UsersController } from './users.controller'
import { User } from "./model/model";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";

const mockUser = {
    _id: "id",
    userName: "test"
}

const mockUpdatedUser = {
    _id: "id",
    userName: "test12"
}

describe('Users', () => {
    let userService: UsersService;
    let userModel: Model<User>


    beforeEach(async () => {
        const userModuleRef: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                // DEFINE DB MODELS AND THEIR DB METHODS LIKE findById, etc

                // DEFINE PROVIDER WITHOUT DECORATOR
                // {
                //     provide: User.name,
                //     useValue: {
                //         new: jest.fn().mockResolvedValue(mockUser),
                //         constructor: jest.fn().mockResolvedValue(mockUser),
                //         create: jest.fn(),
                //         findByIdAndUpdate: jest.fn(),
                //         find: jest.fn(),
                //     }
                // }

                // DEFINE PROVIDER USING DECORATOR
                {
                    provide: getModelToken(User.name),
                    useValue: Model<User>
                }
            ]
        })
            .compile()

        // WITH DECORATOR
        userModel = userModuleRef.get<Model<User>>(getModelToken(User.name))

        // WITHOUT DECORATOR
        // userModel = userModuleRef.get<Model<User>>(User.name)

        userService = userModuleRef.get<UsersService>(UsersService)
    })

    afterEach(async () => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('it should create a user entry', async () => {
            const userData = { userName: "test" }
            const createdUser: any = { _id: "id", ...userData }

            jest.spyOn(userModel, 'create').mockImplementationOnce(() =>
                Promise.resolve(createdUser)
            )

            const result = await userService.createUser(userData);
            expect(result).toEqual(mockUser);
        })
    })

    describe('updateUser', () => {
        it('it should udate a user based on id', async () => {
            const userData = { userName: "test12" }
            const updatedUser: any = { _id: "id", ...userData }

            jest.spyOn(userModel, 'findByIdAndUpdate').mockImplementationOnce((): any =>
                Promise.resolve(updatedUser)
            )

            const result = await userService.updateUser("id", userData);
            expect(result).toEqual(mockUpdatedUser);
        })
    })
})