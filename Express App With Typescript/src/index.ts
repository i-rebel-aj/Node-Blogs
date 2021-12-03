import express from "express";
import path from "path";
import dotenv from "dotenv"
import Logger from './providers/Logger'
import morganMiddleware from './middlewares/Morgan'
import {Database} from './providers/Database'
dotenv.config()
const app = express();

Database.init()
// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );
app.use(morganMiddleware)
app.get( "/health", ( req, res ) => {
    return res.status(200).json({message: "Service Running"})
});

app.get("/logger", (_, res)=>{
    Logger.error("This is an error log");
    Logger.warn("This is a warn log");
    Logger.info("This is a info log");
    Logger.http("This is a http log");
    Logger.debug("This is a debug log");
    res.send("Log Test")
})

// start the Express server
app.listen( process.env.PORT, () => {
    // console.log is not there with typescript
    // tslint:disable-next-line:no-console
    // console.log( `server started at http://localhnost:${ process.env.PORT }` );
    Logger.info(`server started at http://localhost:${ process.env.PORT }`)
} );