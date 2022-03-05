// You can set up mongoDb connection pool here
import mongoose from 'mongoose'
import Locals from './Locals'
import Logger from './Logger'
export class Database{
    public static init():any{
        Logger.info(`Mongoose url is ${Locals.config().mongooseUrl}`)
        mongoose.connect(Locals.config().mongooseUrl!)
            .then((_) => {
              Logger.info('Connected to Distribution API Database - Initial Connection');
            })
            .catch((err) => {
              Logger.error(err)
              Logger.error(`Initial Distribution API Database connection error occured - ${err.message}`);
            });
        mongoose.set("debug",true);
    }
}
export default mongoose