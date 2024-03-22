import { Connection } from "mongoose";
import { User, UserSchema } from "./model/model";

export const catsProviders = [
    {
        provide: User.name,
        useFactory: (connection: Connection) => connection.model(User.name, UserSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];