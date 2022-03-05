import mongoose from '../providers/Database'
import IWallet from '../interfaces/Wallet'

const WalletSchema= new mongoose.Schema<IWallet>({
    description: {
        type: String,
        required: true
    },
    name:{
        type: String
    },
    amount:{
        type: Number,
        default: 100,
        validate: {
            validator: (value: number): boolean=>{
                return value > 0;
              },
              message: 'Minimum Amount must be >0'
        },
    }
}, {timestamps: true}) 



const Blog=mongoose.model<IWallet>('Wallet', WalletSchema)

export default Blog