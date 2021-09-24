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
      res.status(400).send({ error: error.message });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const post = req.body as PostEntity;
      const newPost = await this.postService.create(post);
      res.status(200).send(newPost);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const post = req.body as PostEntity;
      const id = req.params["id"];
      res.status(200).send(this.postService.update(post, id));
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const id = req.params["id"];
      res.status(200).send(this.postService.delete(id));
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };
  public single = async (req: Request, res: Response) => {
    try {
      const id = req.params["id"];
      res.status(200).send(this.postService.single(id));
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  public routes() {
    this.router.get("/", this.index);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
    this.router.get("/:id", this.delete);
  }
}
