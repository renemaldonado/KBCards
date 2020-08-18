import { Request, Response } from "express";
import  CardService  from "../services/cards.service";

// Interfaces
import { ICard } from "../interface/card.interface";

export function cardsWelcome (req: Request, res: Response): Response {
  return res.status(200).json('Welcome to KB-Cards Cards Section');
}

export function list (req: Request, res: Response): Response {

  
  return res.status(200).json('Welcome to KB-Cards Cards Section - List');
}

export async function create(req: Request, res: Response) {
  console.log("CardId " );
  const newCard =  req.body;
  console.log(newCard );

  const cardSrvc = new CardService();
  const cardId = await cardSrvc.createCard(newCard);
  
  console.log("CardId:" + cardId);
  
  return res.status(200).json('Welcome to KB-Cards Cards Section - Create' + cardId);
}
