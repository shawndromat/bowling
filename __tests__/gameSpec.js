import Game from "../src/game"

describe("Game", () => {

  it("handles games with no strikes, spares or misses", () => {
    const input = "12 34 12 34 12 34 12 34 12 34"
    expect(new Game(input).result()).toEqual("score: 50")
  })

  it("handles zero rolls", () => {
    const input = "9- 9- 9- 9- 9- 9- 9- 9- 9- 9-"
    expect(new Game(input).result()).toEqual("score: 90")
  })

  it("handles spares in a non-terminal position", () => {
    const input = "5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 55"
    expect(new Game(input).result()).toEqual("score: 145")
  })

  it("handles strikes in a non-terminal position", () => {
    const input = "12 X 12 34 12 34 X 34 12 34"
    expect(new Game(input).result()).toEqual("score: 70")
  })

  it("handles spares in a terminal position", () => {
    const input = "5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 7"
    expect(new Game(input).result()).toEqual("score: 152")
  })

  it("handles strikes in a terminal position", () => {
    const input = "12 X 12 34 12 34 X 34 12 X 12"
    expect(new Game(input).result()).toEqual("score: 76")
  })

  it("handles a perfect game", () => {
    const input = "X X X X X X X X X X X X"
    expect(new Game(input).result()).toEqual("score: 300")
  })

  describe("incomplete games", () => {
    it("handles fewer than 10 frames", () => {
      const input = "11 11 11 11 11 11 11 11 11"
      expect(new Game(input).result()).toEqual("incomplete game")
    })

    it("handles missing bonus frame terminal spare", () => {
      const input = "11 11 11 11 11 11 11 11 11 1/"
      expect(new Game(input).result()).toEqual("incomplete game")
    })

    it("handles missing bonus frame after terminal strike", () => {
      const input = "11 11 11 11 11 11 11 11 11 X"
      expect(new Game(input).result()).toEqual("incomplete game")
    })

    it("handles missing bonus roll after terminal strike", () => {
      const input = "11 11 11 11 11 11 11 11 11 X 1"
      expect(new Game(input).result()).toEqual("incomplete game")
    })
  })

  describe("invalid games", () => {
    it("handles if any non terminal frame is incomplete", () => {
      const input = "11 11 11 1 11 11 11 11 11 11"
      expect(new Game(input).result()).toEqual("invalid game")
    })

    it("handles if any frame is invalid", () => {
      const input = "11 11 11 67 11 11 11 11 11 11"
      expect(new Game(input).result()).toEqual("invalid game")
    })
  })
})