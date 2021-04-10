pragma solidity >=0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/security/ReentrancyGuard.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract Faucet is ReentrancyGuard, Ownable {
    event Withdrawal(address indexed to, uint256 amount);
    event Deposit(address indexed from, uint256 amount);

    address Celo = 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9;
    address cUSD = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    function withdraw(uint256 withdraw_amount, address token) public {
        // TODO: Prevent withdrawals over certain amount, check tokens
        // require(withdraw_amount <= 0.1 ether, "withdraw amount too high");
        // require(token == Celo || token == cUSD, "token is not cGLD or cUSD");

        require(
            address(this).balance >= withdraw_amount,
            "Insufficient balance in faucet for withdrawal request"
        );

        require(
            IERC20(token).transfer(msg.sender, withdraw_amount),
            "Withdrawing cUSD failed."
        );
        emit Withdrawal(msg.sender, withdraw_amount);
    }

    function donate() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    fallback() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}
