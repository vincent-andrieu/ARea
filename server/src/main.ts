import "module-alias/register";
import { UserSchema } from "@schemas/user.schema";
import Database from "./init/database";
import "./init/express";

// Database example
Database.connect().then(async () => {
    const userSchema = new UserSchema();

    const user = await userSchema.add({ username: "lol", password: "mdr" });

    if (user._id)
        console.log(await userSchema.getById(user._id));

    console.log(await userSchema.isLoginValid("lol", "mdr"));
    console.log(await userSchema.isLoginValid("lol", "sheeeesh"));

    await userSchema.delete(user);
});