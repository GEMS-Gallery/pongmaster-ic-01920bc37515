import Nat "mo:base/Nat";

actor Pong {
  stable var leftScore : Nat = 0;
  stable var rightScore : Nat = 0;

  public func updateScore(left: Nat, right: Nat) : async () {
    leftScore := left;
    rightScore := right;
  };

  public query func getScores() : async (Nat, Nat) {
    return (leftScore, rightScore);
  };

  public func resetScores() : async () {
    leftScore := 0;
    rightScore := 0;
  };
}
