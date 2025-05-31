import type { Request, Response } from "express";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.json());

interface Post {
  id: number;
  author: string;
  content: string;
  image_url: string;
  published_date: string;
}

const posts: (Post | undefined)[] = [];
let i: number = 1;

app.post("/create", (req: Request, res: Response) => {
  console.log(req.body);
  const { author, content, image_url, published_date } = req.body;
  const newPost: Post = {
    id: i,
    author,
    content,
    image_url,
    published_date,
  };
  i++;
  posts[i] = newPost;
  res.status(201).send(newPost);
});

app.get("/get-all-posts", (req: Request, res: Response) => {
  res.status(200).send(posts);
});

app.get("/get/:id", (req: Request, res: Response) => {
  const post = posts[parseInt(req.params.id) + 1];
  if (post) res.status(200).send(post);
  else res.status(404).send("Post not found");
});

app.put("/update/:id", (req: Request, res: Response) => {
  const { author, content, image_url, published_date } = req.body;
  const updatedPost: Post = {
    id: parseInt(req.params.id),
    author,
    content,
    image_url,
    published_date,
  };
  if (posts[parseInt(req.params.id) + 1]) {
    posts[parseInt(req.params.id) + 1] = updatedPost;
    res.status(201).send(updatedPost);
  } else {
    res.status(404).send();
  }
});

app.delete("/delete/:id", (req: Request, res: Response) => {
  const deletedPost = posts[parseInt(req.params.id) + 1];
  if (deletedPost) {
    posts[parseInt(req.params.id) + 1] = undefined;
    res.status(200).send(deletedPost);
  } else {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
