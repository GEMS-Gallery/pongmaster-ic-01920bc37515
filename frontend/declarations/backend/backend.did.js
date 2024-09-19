export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getGameState' : IDL.Func(
        [],
        [
          IDL.Record({
            'rightScore' : IDL.Nat,
            'leftScore' : IDL.Nat,
            'ballX' : IDL.Float64,
            'ballY' : IDL.Float64,
            'rightPaddleY' : IDL.Float64,
            'leftPaddleY' : IDL.Float64,
          }),
        ],
        ['query'],
      ),
    'resetGame' : IDL.Func([], [], []),
    'updateGameState' : IDL.Func([], [], []),
    'updateLeftPaddle' : IDL.Func([IDL.Float64], [], []),
    'updateRightPaddle' : IDL.Func([IDL.Float64], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
