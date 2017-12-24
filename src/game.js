import Frame from './frame'
import {some} from "lodash"

export default class Game {
  constructor(framesInput) {
    this.frames = parseFrames(framesInput)
  }

  score() {
    let score = 0
    let bonuses = [0, 0]

    this.frames.forEach((frame, index) => {
      if(index < 10) {
        score += frame.score()
      }

      score += frame.firstScore() * bonuses[0]

      if(frame.secondScore()) {
        score += frame.secondScore() * bonuses[1]
        bonuses = [0, 0]
      } else {
        bonuses = [bonuses[1], 0]
      }

      if(index < 10) {
        if(frame.isSpare()) {
          bonuses[0] += 1
        } else if (frame.isStrike()) {
          bonuses[0] += 1
          bonuses[1] += 1
        }
      }
    })

    return score
  }
}

const parseFrames = (input) => (
  input.split(' ')
    .map(frameInput => new Frame(frameInput))
)