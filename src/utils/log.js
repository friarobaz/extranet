const FONT_SIZE = 0.8

export const success = (msg) => {
  const css = `color: green; font-size:${FONT_SIZE}rem`
  console.log(`%c✅ ${msg}`, css)
}

export const check = (msg) => {
  const css = `color: darkorange; font-size:${FONT_SIZE}rem`
  console.log(`%c⌛ ${msg}`, css)
}

export const warning = (msg) => {
  const css = `color: red; font-size:${FONT_SIZE}rem`
  console.log(`%c❌ ${msg}`, css)
}

export const black = (msg) => {
  const css = `background: black; color: white; font-size:${FONT_SIZE}rem`
  console.log(`%c🔘          ${msg}          🔘`, css)
}

export const info = (msg) => {
  const css = `color: blue; font-size:${FONT_SIZE}rem`
  console.log(`%c${msg}`, css)
}
