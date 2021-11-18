import User from "../schemas/userSchema";

const userController = {
    create: async ({ displayName, email }={}) => {
        if (!displayName || !email) return new Error("No data provided");
        try {
            const user = new User({ displayName, email });
            await user.save();

            return user;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    delete: async (_id) => {
        if (!_id) return new Error("No data provided");
        try {
            const result = await User.findByIdAndDelete({_id});
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    findUser: async ({ email, displayName }={}) => {
        if (!displayName && !email) return new Error("No data provided");
        try {
            const result = await User.findOne({
                $or: [{ email }, { displayName }],
            });
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
};

export default userController;
