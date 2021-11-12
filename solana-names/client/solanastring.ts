/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
  TransactionSignature,
  Account,
} from '@solana/web3.js';
import * as borsh from 'borsh';
import { TokenInfo, TokenInfoLayout } from './TokenInfo';

import {
  getPayer,
  getRpcUrl,
  newAccountWithLamports,
  createKeypairFromFile,
} from './utils';

/**
 * The expected size of each program account.
 */
const PROGRAM_ACCOUNT_SIZE = 1024;

export async function connect(): Promise<Connection> {
  const rpcUrl = await getRpcUrl();
  const connection = new Connection(rpcUrl, 'confirmed');
  const version = await connection.getVersion();
  console.log('Connection to cluster established:', rpcUrl, version);
  return connection;
}

export async function getAccount(connection: Connection): Promise<Keypair>{
  let fees = 0;
  let account;

  const { feeCalculator } = await connection.getRecentBlockhash();

  // Calculate the cost to fund the rent exempty account
  fees += await connection.getMinimumBalanceForRentExemption(PROGRAM_ACCOUNT_SIZE);

  // Calculate the cost of sending transactions
  fees += feeCalculator.lamportsPerSignature * 100;

  try {
    // Get payer from cli config
    account = await getPayer();
  } catch (err) {
    // Fund a new payer via airdrop
    account = await newAccountWithLamports(connection, fees);
  }

  const lamports = await connection.getBalance(account.publicKey);
  if (lamports < fees) {
    // This should only happen when using cli config keypair
    const sig = await connection.requestAirdrop(
      account.publicKey,
      fees - lamports,
    );
    await connection.confirmTransaction(sig);
  }

  console.log(
    'Using account',
    account.publicKey.toBase58(),
    'containing',
    lamports / LAMPORTS_PER_SOL,
    'SOL to pay for fees',
  );

  return account;
}

export async function getPendingTokenInfosAccount(programId: PublicKey): Promise<PublicKey> {
  let [seededPubkey, n] = await PublicKey.findProgramAddress(
    [Buffer.from("pending_token_infos")],
    programId,
  );
  return seededPubkey;
}

export async function initPendingTokensAccount(connection: Connection, payer: Keypair, programId: PublicKey): Promise<TransactionSignature> {
  console.log('Initializing pending tokens account from payer', payer);

  const seededPubkey = await getPendingTokenInfosAccount(programId);
  const instruction = new TransactionInstruction({
    keys: [
      {pubkey: payer.publicKey, isSigner: false, isWritable: true},
      {pubkey: new PublicKey(seededPubkey), isSigner: false, isWritable: true},
      {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}
    ],
    programId,
    data: Buffer.from([0b0, 0x2]),
  });
  return await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer],
  );
}

export async function proposeToken(
  connection: Connection,
  payer: Keypair,
  programId: PublicKey
  ): Promise<TransactionSignature> {
  let [seededPubkey, n] = await PublicKey.findProgramAddress(
    [Buffer.from("pending_token_infos")],
    programId,
  );
  console.log(`Proposing token to account ${seededPubkey.toBase58()}`);

  const b = Buffer.alloc(512);
  b.fill(0);
  const name = Buffer.alloc(32);
  name.write("name");
  const symbol = Buffer.alloc(32);
  symbol.write("symbol");
  const image_url = Buffer.alloc(160);
  image_url.write("imageurl");
  const tags = Buffer.alloc(128);
  tags.write("tags");

  TokenInfoLayout.encode({
    spl_program_address: programId.toBytes(),
    name,
    symbol,
    image_url,
    tags,
   }, b)

  console.log(b);

  const instruction = new TransactionInstruction({
    keys: [{pubkey: seededPubkey, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.concat([Buffer.from([0b0, 0b0]), b]),
  });
  return await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer],
  );
}

export async function voteForToken(
  connection: Connection,
  payer: Keypair,
  programId: PublicKey
  ): Promise<TransactionSignature> {
  let [seededPubkey, n] = await PublicKey.findProgramAddress(
    [Buffer.from("pending_token_infos")],
    programId,
  );
  console.log(`Voting for token ${programId.toBase58()} in account ${seededPubkey.toBase58()}`);
  console.log(Buffer.from(programId.toBase58()).length)
  const instruction = new TransactionInstruction({
    keys: [{pubkey: seededPubkey, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.concat([
      Buffer.from([0b0, 0b1]), // version, instruction id
      Buffer.from([0x1]),     // amount
      Buffer.from(programId.toBytes()), // public key to vote for
    ]),
  });
  return await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer],
  );
}

export async function getChat(connection: Connection, seededAccount: PublicKey): Promise<TokenInfo> {
  return TokenInfo.load(connection, seededAccount);
}


export async function getProgramAccounts(connection: Connection, programId: PublicKey) {
  return connection.getProgramAccounts(programId);
}