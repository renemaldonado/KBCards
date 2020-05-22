import express , { Application } from 'express';
import morgan from "morgan";

import { Response } from "express-serve-static-core";
import { response } from "express";

// Routes
import IndexRoutes from "./routes/index.routes";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";

declare module "express-serve-static-core" {
    // first, declare that we are adding a method to `Response` (the interface)
    export interface Response {
      userId: string;
    }
  }

response.userId = '';


export class App {
    
    private app: Application;

    constructor(private port?: number | string) {

        
        this.app = express();

        this.settings();
        this.middleware();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middleware(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes(){
       this.app.use('/api',IndexRoutes);
       this.app.use('/api/user', UserRoutes);
       this.app.use('/api/auth', AuthRoutes);
       
    }

    async listen() {
      await this.app.listen(this.app.get('port'));
      console.log('Server on port', this.app.get('port'));
    }
}
