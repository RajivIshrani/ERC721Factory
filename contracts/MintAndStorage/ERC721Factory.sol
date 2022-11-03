// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ERC721Contract.sol";

// write one function for creating nft collection
// write one function for minting nft inside a collection

contract ERC721Factory {
    mapping(address => address[]) public ownerToNFTs;

    // this mapping for nft contract address  to token id to owner of nft
    mapping(address => mapping(uint256 => address)) public nftToIdToOwner;

    //this mapping for nft contract address to owner address
    mapping(address => address) public nftToOwner;

    event NFTContractDeployed(string name, string symbol, address nftContract);
    event NFTMinted(address nftContract, uint256 tokenId);
    event OwnershipChanged(
        address nftContract,
        uint256 tokenId,
        address newOwner
    );

    modifier onlyMinter(address _nftContract) {
        require(
            nftToOwner[_nftContract] == msg.sender,
            "Only Minter can call this!!!"
        );
        _;
    }

    /**
     * @dev takes @param 'name' and 'symbol' and create new instance of ERC721Contract
     * and update mapping of owner to instance contract address
     * and returns instance contract address
     */
    function deployNFTContract(string memory _name, string memory _symbol)
        external
        returns (address _nftContract)
    {
        // create new instance of ERC721 Contract
        address nftContract = address(new ERC721Contract(_name, _symbol));

        //update mapping of owner to new NFTContracts
        ownerToNFTs[msg.sender].push(nftContract);
        nftToOwner[nftContract] = msg.sender;

        // emit event NFTContractDeployed
        emit NFTContractDeployed(_name, _symbol, nftContract);
        return nftContract;
    }

    /**
     *@dev takes @param 'nftcontract' and 'tokenURI and only ERC721Contract deployer can call this function
     *and call mintNewNFT() function from ERC721Contract instance
     *and return updated tokenId
     */
    function mintNFT(address _nftContract, string memory _tokenURI)
        public
        onlyMinter(_nftContract)
    {
        ERC721Contract(_nftContract).mintNewNFT(_tokenURI);
        uint256 _tokenId = ERC721Contract(_nftContract).totalNFTs();

        emit NFTMinted(_nftContract, _tokenId);
    }

    /**
     * @dev see list NFT collection for owner
     */
    function listNFTsForOwner(address _user)
        public
        view
        returns (address[] memory)
    {
        return ownerToNFTs[_user];
    }

    /**
     * @dev see total NFT minted for a contract
     */

    function totalNFTsMinted(address _nftContract)
        public
        view
        returns (uint256)
    {
        return ERC721Contract(_nftContract).totalNFTs();
    }
}
