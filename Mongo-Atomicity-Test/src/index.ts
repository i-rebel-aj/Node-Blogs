import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import Logger from './providers/Logger'
import morganMiddleware from './middlewares/Morgan'
import {Database} from './providers/Database'
import Wallet from './models/Wallet'
import ErrorHandler from './providers/Error'
dotenv.config()
const app = express();

Database.init()
app.use(express.json({limit: '3mb'}));
app.use(express.urlencoded({ limit: '3mb', extended: true }));
app.use(morganMiddleware)
app.use(cors())
app.get( "/health", ( req, res ) => {
    return res.status(200).json({message: "Service Running"})
});
/**
    A helper function, this method returns a promise, which will be resolved 
    after the time specified in ms passes
*/
function timeout(ms: number): Promise<void>{
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
    @route POST /create
    @description Withdraws 10 Rupees, after waiting for 10 seconds
*/
app.post('/create',async (req, res)=>{
    try{
        const wallet=await Wallet.create({
            name: req.body.name,
            description: req.body.description
        })
        return res.status(200).json({message: 'Wallet Created Success', wallet})
    }catch(err){
        ErrorHandler.APIErrorHandler(err, res)    
    }
})
/**
    @route PUT /:wallet_id/withdaw10
    @description Withdraws 10 Rupees Atomically/ With Timeout
*/
app.put('/:id/withdraw10',async (req, res)=>{
    try{
        
        //Not Atomic Segmet
        const foundWallet=await Wallet.findById(req.params.id)
        if(!foundWallet){
            throw new Error('No Wallet Found')
        }
      	//The following timeout method waits for 10 seconds, i.e the next line
      	//will be only executed after 10 seconds
        await timeout(10000)
        foundWallet.amount=foundWallet.amount-10
        await foundWallet.save()
        return res.status(200).json({message: 'Success', wallet: foundWallet})
        
        //Atomic Segment
        // await timeout(10000)
        // await Wallet.updateOne({_id: req.params.id}, {
        //     '$inc':{
        //         'amount': -10
        //     }
        // })
        // return res.status(200).json({message: 'Update Success'})
    }catch(err){
        ErrorHandler.APIErrorHandler(err, res)        
    }
})
/**
    @route PUT /:wallet_id/withdaw20
    @description Withdraws 20 Rupees
*/
app.put('/:id/withdraw20',async (req, res)=>{
    try{
        const foundWallet=await Wallet.findById(req.params.id)
        if(!foundWallet){
            throw new Error('No Wallet Found')
        }
        foundWallet.amount=foundWallet.amount-20
        await foundWallet.save()
        return res.status(200).json({message: 'Success', wallet: foundWallet})
        //Atomic Segment
        // await Wallet.updateOne({_id: req.params.id}, {
        //     '$inc':{
        //         'amount': -10
        //     }
        // },{new: true})
        // return res.status(200).json({message: 'Update Success'})
    }catch(err){
        ErrorHandler.APIErrorHandler(err, res)    
    }
})
/**
    @route GET /:wallet_id
    @description Gets Wallet By Id
*/
app.get('/:id', async (req, res)=>{
    try{
        const foundWallet=await Wallet.findById(req.params.id)
        return res.status(200).json({message: 'Success', wallet: foundWallet})
    }catch(err){
        ErrorHandler.APIErrorHandler(err, res)    
    }
})

// add this handler before emitting any events
process.on('uncaughtException', function (err) {
    console.log('UNCAUGHT EXCEPTION - keeping process alive:', err); 
});
app.listen( process.env.PORT, () => {
    Logger.info(`server started at http://localhost:${ process.env.PORT }`)
} );