import type { Turns } from "./definitions";


export default class Game {
  public multiplayer: boolean = false;
  public player1: string = "";
  public player2: string = "";
  public p1Score: number = 0;
  public p2Score: number = 0;
  public draw:number = 0;
  private totalScore:number = 0;
  public winner: string = "";
  public roundFinished: boolean = false;
  public winnerPattern: number[] = []
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
        this.checkWinner()
          this.turn = 2;
        } else {
          this.player2Pattern.push(box);
        const clickedIndex = this.remained.findIndex((i) => i === box);
        this.remained.splice(clickedIndex, 1);
        this.checkWinner()
          this.turn = 1;
        }
      } else {
        this.player1Pattern.push(box);
        const clickedIndex = this.remained.findIndex((i) => i === box);
        this.remained.splice(clickedIndex, 1);
        this.checkWinner()
        this.turn = 2;
        setTimeout(() => {
          this.randomBox();
          this.checkWinner()
          this.turn = 1;
        }, 1000);
      }
    } else {
        this.randomBox();
        this.checkWinner()
        this.turn = 1;
        
    }

   

  }

  private checkWinner():void{

    if(this.totalScore >= 5){
      if( this.p1Score > this.p2Score){
        this.winner = this.player1
      }else if(this.p1Score < this.p2Score){
        this.winner = this.player2
      }else{
        this.winner = "Draw!"
      }
     
      
    }else{
    


      if(this.turn === 2 && this.winningPatterns.some( pattern => pattern.every( (p,index,array) => { this.winnerPattern = array;  return this.player2Pattern.includes(p)}))){
        this.p2Score++;
        this.totalScore += 1;
        this.roundFinished = true
        setTimeout(()=>{
          this.nextRound();
        },1500)
      
       }else if(this.turn === 1 && this.winningPatterns.some( pattern => pattern.every( (p,index,array) => { this.winnerPattern = array;  return this.player1Pattern.includes(p)}))){
        this.p1Score++;
        this.totalScore += 1;
        this.roundFinished = true
        setTimeout(()=>{
          this.nextRound();
        },1500)
    }else if(this.remained.length < 1){
      this.draw++;
      this.totalScore += 1;
      this.winnerPattern = []
      this.roundFinished = true
      setTimeout(()=>{
        this.nextRound();
      },1500)
    }
  }
  }

  public init(p1?: string, p2?: string): void {
    this.boxes = this.boardPattern.flat();
    this.player1 = p1 || this.player1;
    this.player2 = p2 || this.player2;
    this.p1Score = 0;
    this.p2Score = 0;
    this.draw = 0;
    this.totalScore = 0;
    this.winner = "";
    this.winnerPattern = []
    this.player2Pattern = [];
    this.player1Pattern = [];
    this.multiplayer = false;
  }

  public reset(): void {
    this.boxes = this.boardPattern.flat();
    this.remained = [...this.boxes]
    this.winnerPattern = []
    this.p1Score = 0;
    this.p2Score = 0;
    this.draw = 0;
    this.totalScore = 0;
    this.winner = "";
    this.roundFinished = false
    this.player2Pattern = [];
    this.player1Pattern = [];
    this.multiplayer = this.multiplayer;
  }


  public nextRound():void{
    this.boxes = this.boardPattern.flat();
    this.winnerPattern = []
    this.remained = [...this.boxes]
    this.player2Pattern = [];
    this.player1Pattern = [];
    this.roundFinished = false
  }
}
