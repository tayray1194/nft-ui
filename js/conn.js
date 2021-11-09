
// LOGIC to connect metamask
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    console.log('Install MetaMask')
    document.querySelector('#ethereum-button')
        .innerHTML = "a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' target='_blank'>Install MetaMask</a>";
    document.querySelector('.intro').style.display = 'none';
}


const ethEnabled = async () => {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        console.log('web3.js initialized');
        return true;
    }
    console.log('web3.js NOT initialized');
    return false;
}

//======================================================================================================================
//
// TODO - create handles for HTML elements
//
//======================================================================================================================
// form fields
const NFTAddressInput = document.querySelector('#NFT-Address');
const WhitelistAddressInput = document.querySelector('#Whitelist-Address');
const NFTAmountInput = document.querySelector('#NFT-Amount');
const BaseURIInput = document.querySelector('#Base-URI');
const NFTPriceInput = document.querySelector('#NFT-Price');
const MintAmountInput = document.querySelector('#Mint-Amount');
const SpenderAddressApproveInput = document.querySelector('#Spender-Address');
const TokenIdApproveInput = document.querySelector('#Token-Id');
const SpenderAddressTransferFromInput = document.querySelector('#Spender-Address-2');
const RecipientAddressTransferFromInput = document.querySelector('#Recipient-Address');
const TokenIdTransferFromInput = document.querySelector('#Token-Id-2');
const RecipientAddressTransferInput = document.querySelector('#Recipient-Address-2');
const TokenIdTransferInput = document.querySelector('#Token-Id-3');
const TokenOwnerInput = document.querySelector('#Token-Owner');
const TokenIndexInput = document.querySelector('#Token-Index');
const OwnedTokenLabel = document.querySelector('#Owned-Token-Label');
const TokenIdInput = document.querySelector('#Token-Id-4');
const TokenURILabel = document.querySelector('#Token-URI-Label');
const NFTPriceLabel = document.querySelector('#NFT-Price-Label');
const TotalSupplyLabel = document.querySelector('#Total-Supply-Label');
const SaleStatusLabel = document.querySelector('#Sale-Status-Label');
const PresaleStatusLabel = document.querySelector('#Presale-Status-Label');
const PauseStatusLabel = document.querySelector('#Pause-Status-Label');



// buttons
const WhitelistAddressButton = document.querySelector('#Whitelist-Address-Button');
const SetBaseURIButton = document.querySelector('#Set-Base-URI-Button');
const SetNFTPriceButton = document.querySelector('#Set-NFT-Price-Button');
const MintButton = document.querySelector('#Mint-Button');
const ApproveButton = document.querySelector('#Approve-Button');
const TransferFromButton = document.querySelector('#Transfer-From-Button');
const TransferButton = document.querySelector('#Transfer-Button');
const TokenOfOwnerByIndexButton = document.querySelector('#Token-of-Owner-By-Index-Button');
const ViewTokenURIButton = document.querySelector('#View-Token-URI-Button');
const TotalSupplyButton = document.querySelector('#Total-Supply-Button');
const NFTPriceButton = document.querySelector('#NFT-Price-Button');
const SaleStatusButton = document.querySelector('#Sale-Status-Button');
const PresaleStatusButton = document.querySelector('#Presale-Status-Button');
const PauseStatusButton = document.querySelector('#Pause-Status-Button');
const WithdrawButton = document.querySelector('#Withdraw-Button');
const PauseButton = document.querySelector('#Pause-Button');
const UnpauseButton = document.querySelector('#Unpause-Button');
const ToggleSaleButton = document.querySelector('#Toggle-Sale-Button');
const TogglePresaleButton = document.querySelector('#Toggle-Presale-Button');






//======================================================================================================================
//
// TODO - create a button on the site that says "Connect to Metamask" and has id = 'ethereum-button'
//
//======================================================================================================================
const ethereumButton = document.querySelector('#ethereum-button');


ethereumButton.addEventListener('click', () => {
    // Will start the MetaMask extension
    getAccounts();
});

async function getAccounts() {

    // fetch contract ABI's
    const _tokenABI = await fetch("./js/abis/ClientNFTToken.json")
        .then(response => {
            console.log('Loaded tokenABI');
            return response.json();
        })
        .catch(function (err) {
            console.log(err);
        });
    const tokenABI = _tokenABI["abi"];

    //======================================================================================================================
    //
    // TODO - register event listeners for buttons inside of getAccounts function
    //
    //======================================================================================================================


    WhitelistAddressButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const _whitelistAddress = web3.utils.toChecksumAddress(WhitelistAddressInput.value);
        const _nftAmount = NFTAmountInput.value;
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.whitelistAddress([_whitelistAddress], _nftAmount);
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending whitelistAddress transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('whitelistAddress transaction receipt received!');
                console.log(receipt);
            });
    });

    SetBaseURIButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const _baseURI = BaseURIInput.value;
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.setBaseURI(_baseURI);
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending setBaseURI transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('setBaseURI transaction receipt received!');
                console.log(receipt);
            });
    });

    SetNFTPriceButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const _nftPrice = web3.utils.toWei(web3.utils.fromWei(NFTPriceInput.value, 'ether'), 'ether');
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.setPrice(_nftPrice);
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending setPrice transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('setPrice transaction receipt received!');
                console.log(receipt);
            });
    });

    MintButton.addEventListener('click',  async () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const _mintAmount = MintAmountInput.value;
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);
        const _tokenPrice = await tokenContract.methods.checkPrice().call({from: account});
        const _tokenPriceWei = web3.utils.toWei(web3.utils.fromWei(_tokenPrice, 'ether'), 'ether');
        const _value = _tokenPriceWei*_mintAmount;

        let tx_builder = tokenContract.methods.mint(_mintAmount);
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress,
            value: _value
        };

        console.log('Sending mint transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('mint transaction receipt received!');
                console.log(receipt);
            });
    });

    ApproveButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const _spenderAddress = web3.utils.toChecksumAddress(SpenderAddressApproveInput.value);
        const _tokenId = TokenIdApproveInput.value
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.approve(_spenderAddress, _tokenId);
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending approve transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('approve transaction receipt received!');
                console.log(receipt);
            });
    });

    TransferFromButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const _spenderAddress = web3.utils.toChecksumAddress(SpenderAddressTransferFromInput.value);
        const _recipientAddress = web3.utils.toChecksumAddress(RecipientAddressTransferFromInput.value);
        const _tokenId = TokenIdTransferFromInput.value
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.transferFrom(_spenderAddress, _recipientAddress, _tokenId);
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending transferFrom transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('transferFrom transaction receipt received!');
                console.log(receipt);
            });
    });

    TransferButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const _recipientAddress = web3.utils.toChecksumAddress(RecipientAddressTransferInput.value);
        const _tokenId = TokenIdTransferInput.value
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.transfer(_recipientAddress, _tokenId);
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending transfer transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('transfer transaction receipt received!');
                console.log(receipt);
            });
    });

    TokenOfOwnerByIndexButton.addEventListener('click', async () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);
        const _ownerAddress = web3.utils.toChecksumAddress(TokenOwnerInput.value);
        const _tokenIndex = TokenIndexInput.value
        const _ownedToken = await tokenContract.methods.tokenOfOwnerByIndex(_ownerAddress, _tokenIndex).call({from: account});
        OwnedTokenLabel.innerHTML = 'Owned Token: ' + _ownedToken;

    });

    ViewTokenURIButton.addEventListener('click', async () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);
        const _tokenId = TokenIdInput.value;
        const _tokenURI = await tokenContract.methods.tokenURI(_tokenId).call({from: account});
        TokenURILabel.innerHTML = 'Token URI: ' + _tokenURI;

    });

    NFTPriceButton.addEventListener('click', async () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);
        const _nftPrice = await tokenContract.methods.checkPrice().call();
        NFTPriceLabel.innerHTML = 'NFT Price: ' + _nftPrice;

    });

    TotalSupplyButton.addEventListener('click', async () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);
        const _totalSupply = await tokenContract.methods.totalSupply().call();
        TotalSupplyLabel.innerHTML = 'Total Supply: ' + _totalSupply;

    });

    SaleStatusButton.addEventListener('click', async () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);
        const _saleStatus = await tokenContract.methods.isSaleOpen().call();
        SaleStatusLabel.innerHTML = 'Is Sale Open: ' + _saleStatus;

    });

    PresaleStatusButton.addEventListener('click', async () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);
        const _presaleStatus = await tokenContract.methods.isPresaleOpen().call();
        PresaleStatusLabel.innerHTML = 'Is Presale Open: ' + _presaleStatus;

    });

    PauseStatusButton.addEventListener('click', async () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);
        const _paused = await tokenContract.methods.isContractPaused().call();
        PauseStatusLabel.innerHTML = 'Is Contract Paused: ' + _paused;

    });

    WithdrawButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.withdraw();
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending withdraw transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('withdraw transaction receipt received!');
                console.log(receipt);
            });
    });

    PauseButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.pause();
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending pause transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('pause transaction receipt received!');
                console.log(receipt);
            });
    });

    UnpauseButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.unpause();
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending unpause transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('unpause transaction receipt received!');
                console.log(receipt);
            });
    });

    ToggleSaleButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.toggleSale();
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending toggleSale transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('toggleSale transaction receipt received!');
                console.log(receipt);
            });
    });

    TogglePresaleButton.addEventListener('click',  () => {

        const _tokenAddress = web3.utils.toChecksumAddress(NFTAddressInput.value);
        const tokenContract = new web3.eth.Contract(tokenABI, _tokenAddress);

        let tx_builder = tokenContract.methods.togglePresale();
        let encoded_tx = tx_builder.encodeABI();
        let transactionObject = {
            data: encoded_tx,
            from: account,
            to: _tokenAddress
        };

        console.log('Sending togglePresale transaction...');
        web3.eth.sendTransaction(transactionObject)
            .then(function(receipt){
                console.log('togglePresale transaction receipt received!');
                console.log(receipt);
            });
    });

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    ethereumButton.innerHTML = account;

    let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    if (web3) {
        console.log('web3');
    } else { console.log('NO web3'); }


    const BN = web3.utils.BN;
    const balance = await web3.eth.getBalance(account);



}
