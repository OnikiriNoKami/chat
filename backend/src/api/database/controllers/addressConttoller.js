import Address from "../schemas/addressSchema";

const addressController = {
    create: async(address) => {
        if(!address) return new Error("No data provided.");
        try{
            const newAddress = new Address({address});
            await newAddress.save();
            return newAddress;

        } catch (error){
            console.log(error.message);
            return error
        }
    },
    delete: async(_id) => {
        if(!_id) return new Error("No data provided.");
        try{
            const result = await Address.findByIdAndDelete(_id);
            return result;
        } catch(error){
            console.log(error.message);
            return error;
        }
    },
    findAddress: async(address)=>{
        if(!address) return new Error("No data provided.");
        try{
            const result = await Address.findOne({address});
            return result;

        } catch (error){
            console.log(error.message);
            return error
        }
    }
}

export default addressController;