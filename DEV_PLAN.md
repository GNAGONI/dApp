TODO:

1. Create basic app for contract deployment - DONE
2. Write basic contract for tokens (and use it in real wallets) - DONE
3. Migrate to endpoints
   3.1 Basic migration - DONE
   3.2 Validation - DONE
   3.3 Error handling - DONE
4. Add authorization - DONE
5. Integrate database - DONE
6. Basic coverage of token interface - DONE
7. Main project intregration
8. Full coverage of token interface
9. Add swagger

INVESTIGATE:

1. investigate infura expiration flow
2. think about difference between smart contracts and tokens flow:
   instant transaction(only token flow) / transaction after DOD (contract + token)
3. investigate 18 decimals problem: what is this feature for, when to use it and when not
4. provider usage issue: - transfer eth to corporate account and then proceed transactions? - find ways to use it directly from user accound (without mnemonics) - maybe self-created and supported ETHEREUM NODE!!!
5. Gas and etc. optimization
6. Check options for credential integration
