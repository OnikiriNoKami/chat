import User from "../schemas/userSchema";

const userController = {
    create: async ({ displayName, email }={}) => {
        if (!displayName || !email) return new Error("No data provided");
        const user = new User({ displayName, email });
            await user.save();

            return user;
    },
    delete: async (_id) => {
        if (!_id) return new Error("No data provided");
        const result = await User.findByIdAndDelete({_id});
            return result;
    },
    findUser: async ({ email, displayName }={}) => {
        if (!displayName && !email) return new Error("No data provided");
        const result = await User.findOne({
            $or: [{ email }, { displayName }],
        });
        return result;
    },
};

export default userController;
