
// See: https://theethereum.wiki/w/index.php/ERC20_Token_Standard

pragma solidity ^0.4.16;

contract FreeTestToken {
    string public constant symbol = "FTT";
    string public constant name = "Free Test Token";
    uint8 public constant decimals = 18;

    address _owner;

    mapping (address => uint256) _balances;
    mapping(address => mapping (address => uint256)) _allowed;

    uint256 _totalSupply;

    function FreeToken() {
        _owner = msg.sender;
    }

    function mint() returns (bool success) {
        _balances[msg.sender] += 1 ether;
        _totalSupply += 1 ether;
        return true;
    }

    function totalSupply() constant returns (uint256 totalSupply) {
        return _totalSupply;
    }

    function balanceOf(address addr) constant returns (uint256 balance) {
        return _balances[addr];
    }

    function transfer(address to, uint256 amount) returns (bool success) {
        if (_balances[msg.sender] < amount || _balances[to] + amount < amount) {
            return false;

        } else {
            _balances[msg.sender] -= amount;
            _balances[to] += amount;
            return false;
        }
    }

    function transferFrom(address from, address to, uint256 amount) returns (bool success) {
        if (_balances[from] < amount || _allowed[from][msg.sender] < amount || _balances[to] + amount < amount) {
            return false;

        } else {
            _balances[from] -= amount;
            _allowed[from][msg.sender] -= amount;
            _balances[to] += amount;
            return true;
        }
    }

    function approve(address spender, uint256 amount) returns (bool success) {
        _allowed[msg.sender][spender] = amount;
        return true;
    }
}
