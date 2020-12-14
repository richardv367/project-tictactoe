Assign max or min state to player objects.
Assign a game state object for the board, +10 for win, -10 loss, 0 draw.
First turn player assigned MAX, second assigned MIN
If CPU MAX, random first move, CPU MIN Select move base on MAX available win con
Check move length >= 1, apply minmax()
Assess MAX player wincons when move selected. Scan "combinations" for matches, add matches to wincons.