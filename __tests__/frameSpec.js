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

  describe("#valid", () => {
    it("returns true when single roll is a strike", () => {
      expect(new Frame("X").valid()).toEqual(true)
    })

    it("returns false when rolls add up to more than 10", () => {
      expect(new Frame("67").valid()).toEqual(false)
      expect(new Frame("X3").valid()).toEqual(false)
      expect(new Frame("3X").valid()).toEqual(false)
    })

    it("returns false when spare is in the wrong place", () => {
      expect(new Frame("/7").valid()).toEqual(false)
      expect(new Frame("/").valid()).toEqual(false)
    })
  })

  describe("#incomplete", () => {
    it("returns false when there are two rolls", () => {
      expect(new Frame("11").incomplete()).toEqual(false)
      expect(new Frame("--").incomplete()).toEqual(false)
      expect(new Frame("6/").incomplete()).toEqual(false)
    })

    it("returns true when single roll is not a strike or spare", () => {
      expect(new Frame("1").incomplete()).toEqual(true)
      expect(new Frame("-").incomplete()).toEqual(true)
    })

    it("returns false when single roll is a strike", () => {
      expect(new Frame("X").incomplete()).toEqual(false)
    })
  })
})