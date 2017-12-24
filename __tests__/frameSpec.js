import Frame from '../src/frame'

describe("Frame", () => {

  describe("parsing first and second roll", () => {
    it("handles simple numbers", () => {
      const frame = new Frame("12")
      expect(frame.firstScore()).toEqual(1)
      expect(frame.secondScore()).toEqual(2)
      expect(frame.score()).toEqual(3)
    })

    it("handles misses", () => {
      const frame = new Frame("--")
      expect(frame.firstScore()).toEqual(0)
      expect(frame.secondScore()).toEqual(0)
      expect(frame.score()).toEqual(0)
    })

    it("handles spares", () => {
      const frame = new Frame("6/")
      expect(frame.firstScore()).toEqual(6)
      expect(frame.secondScore()).toEqual(4)
      expect(frame.score()).toEqual(10)
    })

    it("handles strikes", () => {
      const frame = new Frame("X")
      expect(frame.firstScore()).toEqual(10)
      expect(frame.secondScore()).toEqual(null)
      expect(frame.score()).toEqual(10)
    })
  })

  describe("determining strike or spare", () => {
    it("handles no strike or spare", () => {
      const frame = new Frame("12")
      expect(frame.isSpare()).toEqual(false)
      expect(frame.isStrike()).toEqual(false)
    })

     it("handles a spare", () => {
       const frame = new Frame("6/")
       expect(frame.isSpare()).toEqual(true)
       expect(frame.isStrike()).toEqual(false)
     })

    it("handles a strike", () => {
      const frame = new Frame("X")
      expect(frame.isSpare()).toEqual(false)
      expect(frame.isStrike()).toEqual(true)
    })
  })
})