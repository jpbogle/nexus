import * as BufferLayout from 'buffer-layout';
import {
  Connection,
  PublicKey,
} from '@solana/web3.js';
import { Buffer } from 'buffer';

export const TokenInfoLayout: BufferLayout.Structure = BufferLayout.struct(
  [
    BufferLayout.blob(32, "spl_program_address"),
    BufferLayout.blob(32, "name"),
    BufferLayout.blob(32, "symbol"),
    BufferLayout.blob(160, "image_url"),
    BufferLayout.blob(128, "tags"),
    BufferLayout.blob(128),
  ],
);

export class TokenInfo {
  public name: string;
  public symbol: string;
  public image_url: string;
  public tags: string;

  constructor(decoded) {
    this.name = TokenInfo.parseStringBuffer(decoded.name);
    this.symbol = TokenInfo.parseStringBuffer(decoded.symbol);
    this.image_url = TokenInfo.parseStringBuffer(decoded.image_url);
    this.tags = TokenInfo.parseStringBuffer(decoded.tags);
  }

  static parseStringBuffer(buf) {
    return Buffer.from(buf).toString().replace(/^[\s\uFEFF\xA0\0]+|[\s\uFEFF\xA0\0]+$/g, "");
  }

  static getLayout() : BufferLayout.Structure {
    return TokenInfoLayout;
  }

  static async load(
    connection: Connection,
    address: PublicKey,
  ) {
    const accountInfo = await connection.getAccountInfo(address);
    if (accountInfo === null) {
      throw "Load error account is null";
    }
    const { owner, data } = accountInfo;
    const decoded = this.getLayout().decode(data);
    return new TokenInfo(decoded);
  }
}