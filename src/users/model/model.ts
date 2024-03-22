import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
    _id: string;

    @Prop()
    userName: string
}

export const UserSchema = SchemaFactory.createForClass(User);

// WITHOUT DECORATOR USING THE MONGOOSE METHOD
// export interface UserDocument extends Document {
//     readonly userName: string;
// }

// export const UserSchema = new mongoose.Schema<UserDocument>({
//     userName: String
// }, {
//     timestamps: true
// });
