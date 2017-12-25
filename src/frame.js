const rolls = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "-": 0,
  "X": 10
}

export default class Frame {
  constructor(input) {
    [this.first, this.second] = input
  }

  isStrike() {
    return this.first === "X"
  }

  isSpare() {
    return this.second === "/"
  }

  firstScore() {
    return rolls[this.first]
  }

  secondScore() {
    if (this.isSpare()) {
      return 10 - this.first
    } else {
      return this.second ? rolls[this.second] : null
    }
  }

  score() {
    return this.firstScore() + (this.secondScore() || 0)
  }

  valid() {
    if(this.isStrike()) return !this.secondScore()
    if(this.first === "/") return false

    return (this.firstScore() + this.secondScore()) <= 10
  }

  incomplete() {
    if (this.isStrike()) return false

    return this.secondScore() === null
  }
}