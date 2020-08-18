import express , { Application } from 'express';
import morgan from "morgan";

//import { Response } from "express-serve-static-core";
import { response } from "express";

// Routes
import IndexRoutes from "./routes/index.routes";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import CardsRoutes from "./routes/cards.routes";
import ErrorsRoutes from "./routes/errors.routes";
import TagsRoutes from "./routes/tags.routes";

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


     // this.app.use('/api', IndexRoutes);
       this.app.use('/api/users', UserRoutes);
       this.app.use('/api/auth', AuthRoutes);
       
       //this.app.use('/api/status', AuthRoutes);
       this.app.use('/api/cards', CardsRoutes);
       this.app.use('/api/cards/tags', TagsRoutes);
       //this.app.use('/api/cards/types', CardsRoutes);
      // this.app.use('/api/cards/source/types', CardsRoutes);
       //this.app.use('/api/cards/sources', CardsRoutes);
       this.app.use('/api/cards/errors', ErrorsRoutes);
    }

    async listen() {
      await this.app.listen(this.app.get('port'));
      console.log('Server on port', this.app.get('port'));
    }
}
