# Experience with Fullstack Blockchain Development
## Celo: Make it Mobile Hackathon
#### Brittany Deventer
#### 4/14/21

## Goal: Develop a Celo interface for the Green Deeds mobile application

### To Do List: 
1.	Create a wallet / connect to third part
2.	Convert green deed recycling credit, USD fiat, into Celo or cUSD

### Connecting to Valora:

This part of the project was very straight forward.  Using the truffle box for dApp kit made the wallet integration extremely easy.  A login function already existed in App.js.  This existing code also helped me to understand how to make basic requests to the Valora application for other uses as well.
### Converting recycling deeds to Celo/cUSD:

I chose to make a faucet contract for this feature.  Making a new token was out of my scope for this hackathon and I felt a basic MVP could work with a simple faucet, as long as the faucet was filled in production somehow.  
Every attempt to setup a local ganache development network failed.  Eventually I gave up and started developing through Truffle directly to the Alfajores network.   This was my first time making a faucet contract in Solidity.  I read the relevant chapters from the Ethereum book and referenced the [Savings Circle code](https://github.com/celo-org/savings-circle-demo/blob/master/contracts/SavingsCircle.sol) to understand how to work with ERC20 tokens.  Savings Circle also helped me discover the [Open Zeppelin](https://github.com/pkdcryptos/OpenZeppelin-openzeppelin-solidity) library, which has many useful interfaces like the ERC20 or simple Owned and Mortal contracts.   
At first my faucet could only withdraw Celo, because I was not wrapping the call with an ERC20 token contract.  Eventually I realized I could send the specific contract token as a parameter and wrap every withdrawal in an ERC20 token call because Celo and cUSD are both an ERC20 token.  That allowed me to call the same function and withdraw different token types.  
I was unable to figure out how to call a fallback function from the frontend, so I ended up making a donate function within the contract instead.  That way I could follow the same syntax as calling the withdraw function.  I did get help from Josh in office hours on how to call a fallback function, and I used the solution successfully.  The problem was I didn’t know how to get the transaction to go through Valora for permission first if I used the web3 kit directly.  
Once I had all three functions (withdraw celo, withdraw cUSD and donate celo) working as buttons on the dApp, I spent a little time on the user interface for the celo screen on the frontend.  I hid the celo features unless a user was connected to their Valora wallet, and provided a link to download the wallet too.  I also made the celo screen open from the recycle and compost screens.  

### Overall Experience:

This was the simplest development environment I’ve ever had to set up and I’m extremely grateful.  I didn’t have to waste valuable time getting simple things working.  Instead I could actually research the fundamentals and really grow as a developer from this experience.  Sometimes hackathons feel like an IT skills exercise.    Thank you for a fun learning environment!
	
