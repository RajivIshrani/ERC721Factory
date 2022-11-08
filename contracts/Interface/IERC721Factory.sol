// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IERC721Factory {
    function deployNFTContract(string memory _name, string memory _symbol)
        external
        returns (address _nftContract);
}
