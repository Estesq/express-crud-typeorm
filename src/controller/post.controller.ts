import { Router, Response, Request } from "express";
import { PostEntity } from "../database/entities/post";
import { PostService } from "../services/post.service";

export class PostController {
  public router: Router;
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const posts = await this.postService.index();
      res.status(200).send(posts).json();
    } catch (error: any) {
      res.status(400).send("Error! Try again");
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const post = req.body as PostEntity;
      const newPost = await this.postService.create(post);
      res.status(200).send(newPost);
    } catch (error: any) {
      res.status(400).send("Error! Try again");
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const post = req.body as PostEntity;
      const id = req.params["id"];
      const result = await this.postService.update(post, id)
      if(result.affected === 0){
        res.status(200).send("Error! Try again");
      }
      else {
        res.status(200).send("Record has been added successfully!")
      }
    } catch (error: any) {
      res.status(400).send("Error! Try again");
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const id = req.params["id"];
      const result = await this.postService.delete(id)
      if(result.affected === 0){
        res.status(200).send("Error! Try again");
      }
      else {
        res.status(200).send("Record has been deleted successfully!")
      }
    } catch (error: any) {
      res.status(400).send("Error! Try again");
    }
  };
  public single = async (req: Request, res: Response) => {
    try {
      const id = req.params["id"];
      res.status(200).send(await this.postService.single(id));
    } catch (error: any) {
      res.status(400).send("Error! Try again");
    }
  };

  public routes() {
    this.router.get("/", this.index);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
    this.router.get("/:id", this.single);
  }
}
