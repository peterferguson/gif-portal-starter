// - imports
use anchor_lang::prelude::*;

// - program-id
declare_id!("6ujPm31Hz1ik1FBwyrfAmH4WEgbMr3SHpnXqNAWXaSBm");

// - Macro for creating a program with functions that other people can call
#[program]

// - Module 
pub mod myepicproject {
    use super::*;
    // - function with type signature
    // - Initialize the total_gif count on the base accout
    pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {

        // - get a reference to the account which holds the state
        //  - &mut defines a "mutable reference" to base_account.
        // - Otherwise base_account would simply be a "local copy"
        let base_account = &mut ctx.accounts.base_account;

        // - Initialize the state
        base_account.total_gifs = 0;

        // - Do nothing but return `Result` type
        Ok(())
    }
    
    // - function with type signature
    // - Add a gif to the total_gif count on the base accout
    pub fn add_gif(ctx: Context<AddGif>) -> ProgramResult {
        // - Get a reference to the account & increment the gif total
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_gifs += 1;

        Ok(())

    }
}


// - another macro for defining the account constraints
// - This attachs certain variables to the context of StartStuffOff
#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    // - This tells solana how to initialize the account
    // 1 - init => create an account owned by the current program
    // 2 - payer = user => storing data costs $ so the program needs to know who is paying!
    // 2 - user => the user who calls the function is paying for the storage
    // 3 - space => the amount of space the account will need (9000 bytes) 
    // ! Users pay rent for their account on solana ... 
    // ! see (https://docs.solana.com/developing/programming-model/accounts#rent) &
    // ! (https://docs.solana.com/storage_rent_economics)
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    // - This passes data to the program proving the user actually owns the account they are using
    pub user: Signer<'info>,
    // - This references the [SystemProgram](https://docs.solana.com/developing/runtime-facilities/programs#system-program)
    // - This is the program that actually runs Solana
    pub system_program: Program<'info, System>,
}

// - Specifies the data for the AddGif Context.
// ! Adding the account(mut) macro here allows the context to mutate the account
#[derive(Accounts)]
pub struct AddGif<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
}


// - Creating a solana account to store state
#[account]
pub struct BaseAccount {
    // - The state of the account
    // - store the total number of gifs
    pub total_gifs: u64,
}