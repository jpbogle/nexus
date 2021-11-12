import { PublicKey } from '@solana/web3.js';
import path from 'path';
import {
  connect,
  getAccount,
  getProgram,
  getChat,
  getSeededAccount,
  sendMessage,
} from './solanastring';

/**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program deploy ...`
 */
const PROGRAM_KEYPAIR_PATH = path.join(path.resolve(__dirname, '../program/dist'), 'solanastring-keypair.json');
const programId = new PublicKey('2xdcdge2UkGmcApKdPyBvETXL1PD2JLLP48YBQRA4v7U');

const MESSAGE = "MESSAGE3";

const ACCOUNT_SEED = "SEED2";

async function main() {
  console.log("Let's add a message to the chat...");

  const connection = await connect();

  const payerAccount = await getAccount(connection);

  // const programKeypair = await getProgram(connection, PROGRAM_KEYPAIR_PATH);

  const seededPubkey = await getSeededAccount(connection, programId, payerAccount, ACCOUNT_SEED);

  const _confirmation = await sendMessage(connection, payerAccount, seededPubkey, programId, MESSAGE);

  const result = await getChat(connection, seededPubkey);

  console.log('Received string: ', result);
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
