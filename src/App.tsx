import { createSignal } from 'solid-js'
import './App.css'

function App() {
  const [width, setWidth] = createSignal(3)
  const [depth, setDepth] = createSignal(11)
  const [height, setHeight] = createSignal(5)
  const [cellSize, setCellSize] = createSignal(40)
  const [stroke, setStroke] = createSignal(5)

  const tensorWidth = () => width() * cellSize() + stroke()
  const tensorDepth = () => depth() * cellSize() + stroke()
  const tensorHeight = () => height() * cellSize() + stroke()

  return (
    <>
      <div id="control">
        <div>Width: <input type="number" value={3} onInput={(e) => setWidth(+e.currentTarget.value)} /></div>
        <div>Depth: <input type="number" value={11} onInput={(e) => setDepth(+e.currentTarget.value)} /></div>
        <div>Height: <input type="number" value={5} onInput={(e) => setHeight(+e.currentTarget.value)} /></div>
        <div>Cell-size: <input type="number" value={40} onInput={(e) => setCellSize(+e.currentTarget.value)} /></div>
        <div>Stroke: <input type="number" value={5} onInput={(e) => setStroke(+e.currentTarget.value)} /></div>
      </div>
      <div id="display">
        <svg viewBox={`0 0 ${tensorWidth() + tensorDepth()/2} ${tensorHeight() + tensorDepth()/2}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width={cellSize()} height={cellSize()} patternUnits="userSpaceOnUse">
              <rect width={cellSize()} height={stroke()} />
              <rect width={stroke()} height={cellSize()} />
            </pattern>
          </defs>

          <rect
            id="top"
            fill="url(#grid)"
            width={tensorWidth()}
            height={tensorDepth()}
            transform={`translate(${tensorDepth()/2}, 0) skewX(-45) scale(1, 0.5)`}
          />
          <rect
            id="front"
            fill="url(#grid)"
            width={tensorWidth()}
            height={tensorHeight()}
            transform={`translate(0, ${tensorDepth()/2})`}
          />
          <rect
            id="side"
            fill="url(#grid)"
            width={tensorDepth()}
            height={tensorHeight()}
            transform={`translate(${tensorWidth()}, ${tensorDepth()/2}) skewY(-45) scale(0.5, 1)`}
          />
        </svg>
      </div>
    </>
  )
}

export default App
