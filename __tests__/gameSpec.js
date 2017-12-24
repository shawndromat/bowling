import Game from "../src/game"

describe("Game", () => {

  it("handles games with no strikes, spares or misses", () => {
    const input = "12 34 12 34 12 34 12 34 12 34"
    expect(new Game(input).score()).toEqual(50)
  })

  it("handles zero rolls", () => {
    const input = "9- 9- 9- 9- 9- 9- 9- 9- 9- 9-"
    expect(new Game(input).score()).toEqual(90)
  })

  it("handles spares in a non-terminal position", () => {
    const input = "5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 55"
    expect(new Game(input).score()).toEqual(145)
  })

  it("handles strikes in a non-terminal position", () => {
    const input = "12 X 12 34 12 34 X 34 12 34"
    expect(new Game(input).score()).toEqual(70)
  })

  it("handles spares in a terminal position", () => {
    const input = "5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 7"
    expect(new Game(input).score()).toEqual(152)
  })

  it("handles strikes in a terminal position", () => {
    const input = "12 X 12 34 12 34 X 34 12 X 12"
    expect(new Game(input).score()).toEqual(76)
  })

  it("handles a perfect game", () => {
    const input = "X X X X X X X X X X X X"
    expect(new Game(input).score()).toEqual(300)
  })

})