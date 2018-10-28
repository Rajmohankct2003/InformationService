pragma solidity ^0.4.17;

contract Ais {

    struct Account {
        uint accNr;
        string gAcc;
        uint accIndex;
        string accBlocked;
        string accStatus;
    }

    mapping(uint => Account) accounts;

    uint public totAccNrs;

    function insertAccs (uint _accNr, string _gAcc, string _accBlocked ) public payable {

        totAccNrs++;

        Account memory account;
        account.accNr = _accNr;
        account.gAcc = _gAcc;
        account.accIndex = totAccNrs;
        account.accBlocked = _accBlocked;
        account.accStatus = 'ACTIVE';

        accounts[_accNr] = account;
    }

    function getAccount(uint _accNr) view public returns (uint, string, uint, string, string) {
        return (accounts[_accNr].accNr,
                accounts[_accNr].gAcc,
                accounts[_accNr].accIndex,
                accounts[_accNr].accBlocked,
                accounts[_accNr].accStatus);
    }
    function updAccount(uint _accNr, string _gAcc, string _accBlocked ) public payable {
        accounts[_accNr].gAcc = _gAcc;
        accounts[_accNr].accBlocked = _accBlocked;
    }
    function delAccount(uint _accNr ) public payable  {
        accounts[_accNr].accStatus = 'NOT ACTIVE';
    }
}
