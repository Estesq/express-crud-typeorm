import "reflect-metadata"
import express, {Request, Response} from 'express';
import { PostController } from './controller/post.controller'; // import the post controller
import { createConnection } from "typeorm";
import { PostEntity } from "./database/entities/post";

class Server {
  private postController: PostController;
  private app: express.Application;

  constructor(){
    this.app = express();
    this.configuration();
    this.routes();
  }

  public configuration() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(express.json());
  }

  public async routes(){
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "blog",
      entities: [PostEntity],
      synchronize: true,
      name: "blog"
    });

    this.postController = new PostController();

    this.app.get( "/", (req: Request, res: Response ) => {
      res.send( "Hello world!" );
    });

    this.app.use(`/api/posts/`,this.postController.router);
  }

  public start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server(); 
server.start(); 
