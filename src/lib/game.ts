import type { Turns } from "./definitions";


export default class Game {
  public multiplayer: boolean = false;
  public player1: string = "";
  public player2: string = "";
  public p1Score: number = 0;
  public p2Score: number = 0;
  public winner: string = "";
  public turn: Turns = 0;
  public boardPattern: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  public boxes: number[] = this.boardPattern.flat();
  private remained: number[] = [...this.boxes];
  private winningPatterns: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  private player1Pattern: number[] = [];
  private player2Pattern: number[] = [];
  constructor(player1?: string, player2?: string) {
    this.player1 = player1 || "player 1";
    this.player2 = player2 || "player 2";
  }
  public playerMode(): void {
    this.multiplayer = !this.multiplayer;
    this.reset()
  }

  private randomBox(): void {
    const randomNumber: number = Math.floor(
      Math.random() * this.remained.length
    );
    this.player2Pattern.push(this.remained[randomNumber]);
    this.remained.splice(randomNumber, 1);
  }

  public p2Pattern(input: number): boolean {
    return this.player2Pattern.some((i) => i === input);
  }
  public p1Pattern(input: number): boolean {
    return this.player1Pattern.some((i) => i === input);
  }
  public gameHandler(box: number): void {
   
    if (this.turn !== 0) {
      if (this.multiplayer) {
        if (this.turn === 1) {
          this.player1Pattern.push(box);
        const clickedIndex = this.remained.findIndex((i) => i === box);
        this.remained.splice(clickedIndex, 1);
          this.turn = 2;
        } else {
          this.player2Pattern.push(box);
        const clickedIndex = this.remained.findIndex((i) => i === box);
        this.remained.splice(clickedIndex, 1);
          this.turn = 1;
        }
      } else {
        this.player1Pattern.push(box);
        const clickedIndex = this.remained.findIndex((i) => i === box);
        this.remained.splice(clickedIndex, 1);
        this.turn = 2;
        setTimeout(() => {
          this.randomBox();
          this.turn = 1;
        }, 1000);
      }
    } else {
        this.randomBox();
        this.turn = 2;
    }
  }

  public init(p1?: string, p2?: string): void {
    this.boxes = this.boardPattern.flat();
    this.player1 = p1 || this.player1;
    this.player2 = p2 || this.player2;
    this.p1Score = 0;
    this.p2Score = 0;
    this.winner = "";
    this.player2Pattern = [];
    this.player1Pattern = [];
    this.multiplayer = false;
  }

  public reset(): void {
    this.boxes = this.boardPattern.flat();
    this.p1Score = 0;
    this.p2Score = 0;
    this.winner = "";
    this.player2Pattern = [];
    this.player1Pattern = [];
    this.multiplayer = this.multiplayer;
  }
}
