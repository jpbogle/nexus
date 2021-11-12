use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    log::{sol_log_params, sol_log_slice},
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    borsh::try_from_slice_unchecked,
};

pub trait Serdes: Sized + BorshSerialize + BorshDeserialize {
	fn pack(&self, dst: &mut [u8]) {
		let encoded = self.try_to_vec().unwrap();
		dst[..encoded.len()].copy_from_slice(&encoded);
		dst[encoded.len()..].fill(0);
	}
	fn unpack(src: &[u8]) -> Result<Self, ProgramError> {
		Self::try_from_slice(src).map_err(|_| ProgramError::InvalidAccountData)
	}
}

#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug, Clone)]
pub struct Message {
    // is_initialized: bool,
	pub txt: String,
}

impl Serdes for Message {}

entrypoint!(entry);

fn entry(
	_program_id: &Pubkey,
	accounts: &[AccountInfo],
	instruction_data: &[u8],
) -> ProgramResult {
	let accounts_iter = &mut accounts.iter();
	let account = next_account_info(accounts_iter)?;
	msg!("============================ NEXUS ============================");

	msg!("instruction_data: ");
	sol_log_slice(instruction_data);
	msg!("params: ");
	sol_log_params(accounts, instruction_data);
	msg!("account: {:?}", account);

	let mut data = account.try_borrow_mut_data()?;
	// let mut unpacked = Message::unpack(&data).expect("Failed to read data");
	// let mut unpacked = Message::try_from_slice(&data).unwrap();

	let mut unpacked:Message = try_from_slice_unchecked(&data)?;
	let instruction = String::from_utf8(instruction_data.to_vec()).map_err(|err| {
			msg!("Invalid UTF-8, from byte {}", err);
			ProgramError::InvalidInstructionData
	})?;
	
	let iter = instruction.chars();
	let slice = iter.as_str();
	let mut txt_final = String::from(slice);
	txt_final.truncate(996);
	msg!("message: {}", txt_final);
	unpacked.txt = txt_final;
	msg!("data: {:?}", unpacked);

	// unpacked.serialize(&mut &mut account.data.borrow_mut()[..])?;
	unpacked.pack(&mut data);

	Ok(())
}