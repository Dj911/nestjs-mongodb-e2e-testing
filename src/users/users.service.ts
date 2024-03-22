import { Inject, Injectable } from '@nestjs/common';
import { User, UserDocument } from './model/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) { }

    async createUser(data: any): Promise<any> {
        return await this.userModel.create(data)
    }

    async updateUser(id: string, data: any): Promise<UserDocument> {
        return await this.userModel.findByIdAndUpdate(id, { $set: { ...data } }, { new: true })

    }

    async getUsers(): Promise<UserDocument[]> {
        return await this.userModel.find()

    }
}
