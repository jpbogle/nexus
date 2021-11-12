import { PublicKey } from '@solana/web3.js';
import path from 'path';
import {
  connect,
  getAccount,
  checkProgram,
  setString,
  getSeededAccount,
  getString,
} from './solanastring';

import {
  getPayer,
  getRpcUrl,
  newAccountWithLamports,
  createKeypairFromFile,
} from './utils';

/**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program deploy ...`
 */
const PROGRAM_KEYPAIR_PATH = path.join(path.resolve(__dirname, '../program/dist'), 'solanastring-keypair.json');

const DATA = "DATA";

const ACCOUNT_SEED = "SEED";

async function main() {
  // console.log("Let's say add data to a Solana account...");

  const connection = await connect();
  newAccountWithLamports(connection, 1000);

  const lamports = await connection.getBalance(new PublicKey('22222222222222222222222222222222222222222222'));
  console.log(lamports);

  const payerAccount = await getAccount(connection);

  const programKeypair = await checkProgram(connection, PROGRAM_KEYPAIR_PATH);

  const seededPubkey = await getSeededAccount(connection, programKeypair.publicKey, payerAccount, ACCOUNT_SEED);

  const _confirmation = await setString(connection, payerAccount, seededPubkey, programKeypair.publicKey, DATA);

  const result = await getString(connection, seededPubkey);

  console.log('Received string: ', result);
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
