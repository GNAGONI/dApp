pragma solidity ^0.4.24;


interface tokenRecipient {
    function receiveApproval(
        address _from,
        uint256 _value,
        address _token,
        bytes _extraData
    ) external;
}


contract Token {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
    event Burn(address indexed from, uint256 value);

    constructor(uint256 initialSupply, string tokenName, string tokenSymbol)
        public
    {
        totalSupply = initialSupply * 10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        name = tokenName;
        symbol = tokenSymbol;
    }

    // TRANSFER

    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_to != 0x0, 'Transfer receiver is null');
        require(
            balanceOf[_from] >= _value,
            'The balance of transfer sender is not enough'
        );
        require(
            balanceOf[_to] + _value >= balanceOf[_to],
            'The value to transfer is null'
        );

        uint256 previousBalances = balanceOf[_from] + balanceOf[_to];

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);

        emit Transfer(_from, _to, _value);
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    // ALLOWANCE

    function transferFrom(address _from, address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(
            _value <= allowance[_from][msg.sender],
            'This address is not in allowed list'
        );
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value; // msg.sender allows _spender to spend the number (_value) of tokens

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function approveAndCall(address _spender, uint256 _value, bytes _extraData)
        public
        returns (bool success)
    {
        tokenRecipient spender = tokenRecipient(_spender);

        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, this, _extraData);
            return true;
        }
    }

    // BURN

    function burn(uint256 _value) public returns (bool success) {
        require(
            balanceOf[msg.sender] >= _value,
            'The balance of sender is not enough'
        );

        balanceOf[msg.sender] -= _value;
        totalSupply -= _value;

        emit Burn(msg.sender, _value);

        return true;
    }

    function burnFrom(address _from, uint256 _value)
        public
        returns (bool success)
    {
        require(
            balanceOf[_from] >= _value,
            'The balance of requested address is not enough'
        );
        require(
            _value <= allowance[_from][msg.sender],
            'The requested amount of tokens is more than allowed'
        );

        balanceOf[_from] -= _value;
        totalSupply -= _value;

        emit Burn(msg.sender, _value);

        return true;
    }
}
