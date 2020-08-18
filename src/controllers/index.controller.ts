import { Request, Response } from "express";

export function indexWelcome (req: Request, res: Response): Response {
  return res.status(200).json('Welcome to KB-Cards Index');
}