import { PublicKey } from '@solana/web3.js';
import path from 'path';
import {
  connect,
  getAccount,
  getPendingTokenInfosAccount,
  getChat,
  proposeToken,
  initPendingTokensAccount,
  voteForToken,
  getProgramAccounts,
} from './solanastring';

/**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program deploy ...`
 */
const PROGRAM_KEYPAIR_PATH = path.join(path.resolve(__dirname, '../program/dist'), 'solananames-keypair.json');
const programId = new PublicKey('GEDXc3gaDgbmRwEyfQbxVaJBKGR43bioD3xmdqhQmnXL');

const DATA = "5D2Yv9BreamzYfnsJX1U8GptboBeEwiva8pfNZfAF9g,name4,symbol,image";

const ACCOUNT_SEED = "SEED9";

async function main() {
  const connection = await connect();

  const payerAccount = await getAccount(connection);

  // const _confirmation1 = await initPendingTokensAccount(connection, payerAccount, programId);
  
  const seededPubkey = await getPendingTokenInfosAccount(programId);

  // const seededPubkey = await createPendingTokenInfoAccount(connection, programId, payerAccount);
  console.log(seededPubkey);
  // const _confirmationPropose = await proposeToken(connection, payerAccount, programId);

  const _confirmationVote = await voteForToken(connection, payerAccount, programId);

  const result = await getChat(connection, seededPubkey);

  console.log('Received string: ', result);

  const programAccounts = await getProgramAccounts(connection, programId);

  console.log(programAccounts);
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
