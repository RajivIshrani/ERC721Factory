// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Factory is ERC721, Ownable {
    using Strings for uint256;

    uint256 public constant MAX_NFTS = 100000;
    uint8 public constant NFTS_RESERVED = 2;
    uint256 public price = 10000000000000000;
    uint256 public constant MAX_MINT_PER_TX = 10;
    uint256 public totalSupply;
    mapping(address => uint256) private mintedPerWallet;
    string public baseUri;
    string public baseExtenstion = ".json";

    event Mint(address indexed to, uint256 indexed id);

    constructor() ERC721("NFT", "SYM") {
        baseUri = "ipfs://xxxxxxxxxxxxxxxxxxxxxxxxxxxxx/";
        for (uint256 i = 1; i <= NFTS_RESERVED; ++i) {
            _safeMint(msg.sender, i);
        }
        totalSupply = NFTS_RESERVED;
    }

    function mint(uint256 _numNfts) external payable {
        require(
            _numNfts <= MAX_MINT_PER_TX,
            "You Can not mint that many in one transaction"
        );
        require(
            mintedPerWallet[msg.sender] + _numNfts <= MAX_MINT_PER_TX,
            "You cannot mint that many total"
        );
        uint256 currentTotalSupply = totalSupply;
        require(
            currentTotalSupply + _numNfts <= MAX_NFTS,
            "exceeds total supply"
        );
        require(_numNfts * price <= msg.value, "Insufficient funds");

        for (uint256 i = 1; i <= _numNfts; i++) {
            _safeMint(msg.sender, currentTotalSupply + i);
        }
        mintedPerWallet[msg.sender] += _numNfts;
        totalSupply += _numNfts;
        emit Mint(msg.sender, _numNfts);
    }

    function setBaseUri(string memory _baseUri) external onlyOwner {
        baseUri = _baseUri;
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    function withdrawAll() external payable onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(0x519cc830171e6237fab773D6C5039b35F785d232)
            .call{value: balance}("");
        require(success, "Failed to send Ether");
    }
}
