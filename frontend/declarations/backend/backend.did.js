export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getScores' : IDL.Func([], [IDL.Nat, IDL.Nat], ['query']),
    'resetScores' : IDL.Func([], [], []),
    'updateScore' : IDL.Func([IDL.Nat, IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
