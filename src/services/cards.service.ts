// DB
import { connect } from "../database";

// Interfaces
import { RowDataPacket } from "mysql2";
import { ICard } from "../interface/card.interface";
import { IType } from "../interface/type.interface";
import { ITag } from "../interface/tag.interface";
import { IError } from "../interface/error.interface";
import { ISource } from "../interface/source.interface";

// Helpers
import { CardHelper } from "../helpers/card.helper";

export default class CardService {
  constructor() {}

  public async createCard(card: any): Promise<number> {
    const queryCard = "CALL kbc_card_create(?, ?, ?, ?, ?);";
    
    
    const conn = await connect();
    const [rows, fields] = await conn.query(queryCard, [
      card.descrS,
      card.descrL,
      card.type,
      3, // Status
      54, //card.user,
    ]);

    const cardId: number = CardHelper.getId((<RowDataPacket[]>rows)[0]);

    console.log("Card ID:" + cardId);

    this.setCardTag(cardId, card.tags );
    console.log("Tags Created");

    this.setCardSource(cardId, card.errorSource);
    console.log("Sources Created");

    return cardId;
  }

  private async setCardTag(cardId: number, tags: any[]) {
    const queryTag = "CALL kbc_card_set_tag(?, ?);";
    const conn = await connect();

    tags.forEach(async (tag: any) => {
      const [rowsRelTag, fieldsRel] = await conn.query(queryTag, [
        cardId,
        tag.id,
      ]);
     
      const relId = CardHelper.getId((<RowDataPacket[]>rowsRelTag)[0]);
    });
  }

  private async setCardSource(cardId: number, sources: any[]) {
    const querySource = "CALL kbc_card_set_source_error(?, ?, ?)";

    const conn = await connect();

    sources.forEach(async (cardSrc: any) => {

      const [rowsRelSrc, fieldsRelSrc] = await conn.query(querySource, [
        cardSrc.sourceId,
        cardSrc.errorId,
        cardId,
      ]);

     // const relIdsr = CardHelper.getId((<RowDataPacket[]>rowsRelSrc)[0]);
    });

  }
}
