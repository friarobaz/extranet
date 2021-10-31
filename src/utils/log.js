const SPACE = " "
const FONT_SIZE = 0.8

export const success = (msg, spaces = 0) => {
  const css = `color: green; font-size:${FONT_SIZE}rem`
  console.log(`%c${SPACE.repeat(spaces * 3)}✅ ${msg}`, css)
}

export const check = (msg, spaces = 0) => {
  const css = `color: darkorange; font-size:${FONT_SIZE}rem`
  console.log(`%c${SPACE.repeat(spaces * 3)}⌛ ${msg}`, css)
}

export const warning = (msg, spaces = 0) => {
  const css = `color: red; font-size:${FONT_SIZE}rem`
  console.log(`%c${SPACE.repeat(spaces * 3)}❌ ${msg}`, css)
}
