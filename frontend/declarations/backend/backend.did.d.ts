import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getGameState' : ActorMethod<
    [],
    {
      'rightScore' : bigint,
      'leftScore' : bigint,
      'ballX' : number,
      'ballY' : number,
      'rightPaddleY' : number,
      'leftPaddleY' : number,
    }
  >,
  'resetGame' : ActorMethod<[], undefined>,
  'updateGameState' : ActorMethod<[], undefined>,
  'updateLeftPaddle' : ActorMethod<[number], undefined>,
  'updateRightPaddle' : ActorMethod<[number], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
