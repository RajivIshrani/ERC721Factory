// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721Contract is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}
    
    event NFTMinted(address account, uint256 tokenId);

    /**
     * @dev creates mintNewNFT function that takes @param tokenURI
     * and mint new NFT and set URI and returns tokenId of new minted NFT
     */
    function mintNewNFT(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit NFTMinted (msg.sender, newItemId);
        return newItemId;
        
    }

    /**
     * @dev see total no of NFTs
     */
    function totalNFTs() public view returns (uint256) {
        return _tokenIds.current();
    }
}
