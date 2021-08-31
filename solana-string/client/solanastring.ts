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
} from '@solana/web3.js';
import * as borsh from 'borsh';

import {
  getPayer,
  getRpcUrl,
  newAccountWithLamports,
  createKeypairFromFile,
} from './utils';

/**
 * The state of a greeting account managed by the hello world program
 */
class Message {
  txt = "";
  constructor(fields: {txt: string} | undefined = undefined) {
    if (fields) {
      this.txt = fields.txt;
    }
  }
}

/**
 * Borsh schema definition for greeting accounts
 */
const MessageSchema = new Map([
  [Message, {kind: 'struct', fields: [['txt', 'string']]}],
]);

/**
 * The expected size of each program account.
 */
const PROGRAM_ACCOUNT_SIZE = borsh.serialize(
  MessageSchema,
  new Message({txt: "testtesttesttest"}),
).length;


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

export async function getSeededAccount(connection: Connection, programId: PublicKey, account: Keypair, seed: string): Promise<PublicKey> {
  // Derive the address (public key) of account from the program so that it's easy to find later.
  const seededPubkey = await PublicKey.createWithSeed(
    account.publicKey,
    seed,
    programId,
  );

  // Check if the account from seed has already been created
  const seededAccount = await connection.getAccountInfo(seededPubkey);
  if (seededAccount === null) {
    console.log(
      'Creating program account',
      seededPubkey.toBase58(),
      'to say store data to with size / space',
      PROGRAM_ACCOUNT_SIZE,
    );
    const lamports = await connection.getMinimumBalanceForRentExemption(
      PROGRAM_ACCOUNT_SIZE,
    );

    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: account.publicKey,
        basePubkey: account.publicKey,
        seed,
        newAccountPubkey: seededPubkey,
        lamports,
        space: PROGRAM_ACCOUNT_SIZE,
        programId,
      }),
    );
    await sendAndConfirmTransaction(connection, transaction, [account]);
  }

  return seededPubkey;
}

export async function checkProgram(connection: Connection, program_keypair_path:string): Promise<Keypair> {
  // Read program id from keypair file
  let programKeypair;
  try {
    console.log("Creating keypair from file: ", program_keypair_path)
    programKeypair = await createKeypairFromFile(program_keypair_path);
  } catch (err) {
    const errMsg = (err as Error).message;
    throw new Error(
      `Failed to read program keypair at '${program_keypair_path}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/helloworld.so\``,
    );
  }

  // Check if the program exists
  const programId = programKeypair.publicKey;
  const programInfo = await connection.getAccountInfo(programId);
  if (programInfo === null) {
    throw new Error(`Program not found at programId (${programId}) program need to be built and deployed`);
  } else if (!programInfo.executable) {
    throw new Error(`Program is not executable`);
  }
  console.log(`Using program ${programId.toBase58()}`);
  return programKeypair;
}

export async function setString(connection: Connection, account: Keypair, seededAccount: PublicKey, programId: PublicKey, str: string): Promise<TransactionSignature> {
  console.log('Setting string', seededAccount.toBase58());
  const instruction = new TransactionInstruction({
    keys: [{pubkey: seededAccount, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.from(str),
  });
  return await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [account],
  );
}

export async function getString(connection: Connection, seededAccount: PublicKey): Promise<string> {
  const accountInfo = await connection.getAccountInfo(seededAccount);
  if (accountInfo === null) {
    throw 'Error: cannot find the greeted account';
  }
  console.log("account info: ", accountInfo);
  return Buffer.from(accountInfo.data).toString().substr(0,1000).trim();
}
