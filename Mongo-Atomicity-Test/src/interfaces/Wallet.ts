import mongoose from "../providers/Database"
export default interface IWallet extends mongoose.Document{
    description: string,
    name: string,
    amount: number,
}