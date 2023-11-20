// Import the StarkWare SDK
const starkware = require('starkware-lib');

// Initialize the StarkNet contract information
const contractAddress = '0xYOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const starkNetContractABI = [
  // Define your contract's ABI (functions and their signatures)
  // Example: { name: 'participate', signature: 'participate(felt)' }
  // Add the ABI for each function you want to interact with in the contract
];

// Initialize the StarkNet provider
const starkProvider = new starkware.StarkwareProvider('https://starknet-YOUR_NETWORK_URL.rpc', 'starknet-YOUR_NETWORK');

// Initialize the StarkNet contract
const starkNetContract = new starkware.Contract(starkProvider, starkNetContractABI, contractAddress);

// Connect to the StarkNet wallet extension
starkware.connect()
  .then(async () => {
    // Get the connected wallet
    const wallet = await starkware.getWallet();

    // Sign the transaction to deposit funds into the contract
    const depositAmount = 100; // Replace with the desired deposit amount
    const tx = await starkNetContract.deposit(depositAmount).sign(wallet);

    // Send the signed transaction to the contract
    const result = await starkProvider.sendTransaction(tx);
    console.log('Transaction result:', result);

    // Example: Call other contract functions similarly using the starkNetContract object
    // const participateTx = await starkNetContract.participate(50).sign(wallet);
    // const participateResult = await starkProvider.sendTransaction(participateTx);
    // console.log('Participation result:', participateResult);
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
