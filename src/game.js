import Frame from './frame'
import {some} from "lodash"

export default class Game {
  constructor(framesInput) {
    this.frames = parseFrames(framesInput)
  }

  result() {
    if (this.framesInvalid() || this.tooManyFrames()) {
      return "invalid game"
    } else if (this.incompleteGame()) {
      return "incomplete game"
    } else {
      return `score: ${this.score()}`
    }
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

  framesInvalid() {
    if(some(this.frames, frame => !frame.valid())) {
      return true
    }
    const allButLastFrame = this.frames.slice(0, this.frames.length - 1)
    if(some(allButLastFrame, frame => frame.incomplete())) {
      return true
    }
  }

  incompleteGame() {
    if (this.frames.length < 10) {
      return true
    }

    const tenthFrame = this.frames[9]
    const eleventhFrame = this.frames[10]

    if (this.frames.length === 10) {
      return tenthFrame.isStrike()
              || tenthFrame.isSpare()
              || tenthFrame.incomplete()
    } else if (this.frames.length === 11) {
      return tenthFrame.isStrike()
        && (eleventhFrame.incomplete() || eleventhFrame.isStrike())
    }
  }

  tooManyFrames() {
    if(this.frames.length > 12) {
      return true
    }

    return this.frames.length > 10 && !this.tenthFrameBonus()
  }

  tenthFrameBonus() {
    const tenthFrame = this.frames[9]
    return tenthFrame.isSpare() || tenthFrame.isStrike()
  }
}

const parseFrames = (input) => (
  input.split(' ')
    .map(frameInput => new Frame(frameInput))
)