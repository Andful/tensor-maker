import { createSignal, For } from 'solid-js'
import './App.css'

function App() {
  const [width, setWidth] = createSignal(3)
  const [depth, setDepth] = createSignal(11)
  const [height, setHeight] = createSignal(1)
  const [cellSize, setCellSize] = createSignal(40)
  const [stroke, setStroke] = createSignal(5)

  const [offset, setOffset] = createSignal(60)
  const [repetition, setRepetition] = createSignal(11)

  const [iteration, setIteration] = createSignal(0)

  const tensorWidth = () => width() * cellSize() + stroke()
  const tensorDepth = () => depth() * cellSize() + stroke()
  const tensorHeight = () => height() * cellSize() + stroke()

  const color = (i: number, delay: number, _pink?: boolean) => {
    const pink = _pink ?? true;
    const index = repetition() - (iteration() - delay);
    if (i < index) {
      return "white"
    } else if (i == index && !pink) {
      return "pink"
    } else if (i < index + 3 && pink) {
      return "pink"
    } else {
      return "gray"
    }
  }

  return (
    <>
      <div id="control">
        <div>Width: <input type="number" value={width()} onInput={(e) => setWidth(+e.currentTarget.value)} /></div>
        <div>Depth: <input type="number" value={depth()} onInput={(e) => setDepth(+e.currentTarget.value)} /></div>
        <div>Height: <input type="number" value={height()} onInput={(e) => setHeight(+e.currentTarget.value)} /></div>
        <div>Cell-size: <input type="number" value={cellSize()} onInput={(e) => setCellSize(+e.currentTarget.value)} /></div>
        <div>Stroke: <input type="number" value={stroke()} onInput={(e) => setStroke(+e.currentTarget.value)} /></div>
        <div>Offset: <input type="number" value={offset()} onInput={(e) => setOffset(+e.currentTarget.value)} /></div>
        <div>Repetition: <input type="number" value={repetition()} onInput={(e) => setRepetition(+e.currentTarget.value)} /></div>
        <div>Iteration: <input type="number" value={iteration()} onInput={(e) => setIteration(+e.currentTarget.value)} /></div>
        <button onClick={(e) => {
          const svg = document.querySelector("svg");
          const serializer = new XMLSerializer();
          const source = serializer.serializeToString(svg as SVGSVGElement);
          const data = new Blob([source]);
          const a = document.createElement('a');
          a.href = URL.createObjectURL(data.slice(0, data.size, "image/svg+xml"));
          a.download = `${String(iteration()).padStart(2, "0")}.svg`;
          a.click()
          setIteration(iteration() + 1)
        }}>Download</button>
      </div>
      <div id="display">
        <svg viewBox={`0 0 ${tensorWidth() + tensorDepth()/2} ${tensorHeight() + tensorDepth()/2 + (repetition() - 1)*offset()}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width={cellSize()} height={cellSize()} patternUnits="userSpaceOnUse">
              <rect width={cellSize()} height={stroke()} />
              <rect width={stroke()} height={cellSize()} />
            </pattern>
          </defs>
          <For each={[... new Array(repetition())]}>{(_, i) =>
            <g transform={`translate(0, ${(repetition() - 1 - i())*offset()})`}>
              <rect
                id="top"
                fill={color(i(), 0, false)}
                width={tensorWidth()}
                height={tensorDepth()}
                transform={`translate(${tensorDepth()/2}, 0) skewX(-45) scale(1, 0.5)`}
              />
              <rect
                id="front"
                fill={color(i(), 0, false)}
                width={tensorWidth()}
                height={tensorHeight()}
                transform={`translate(0, ${tensorDepth()/2})`}
              />
              <rect
                id="side"
                fill={color(i(), 0, false)}
                width={tensorDepth()}
                height={tensorHeight()}
                transform={`translate(${tensorWidth()}, ${tensorDepth()/2}) skewY(-45) scale(0.5, 1)`}
              />
              <rect
                fill="url(#grid)"
                width={tensorWidth()}
                height={tensorDepth()}
                transform={`translate(${tensorDepth()/2}, 0) skewX(-45) scale(1, 0.5)`}
              />
              <rect
                fill="url(#grid)"
                width={tensorWidth()}
                height={tensorHeight()}
                transform={`translate(0, ${tensorDepth()/2})`}
              />
              <rect
                fill="url(#grid)"
                width={tensorDepth()}
                height={tensorHeight()}
                transform={`translate(${tensorWidth()}, ${tensorDepth()/2}) skewY(-45) scale(0.5, 1)`}
              />
            </g>}
          </For>
          <For each={[/*... new Array(repetition())*/]}>{(_, i) =>
            <g transform={`translate(700, ${(repetition() - 1 - i())*offset()})`}>
              <rect
                id="top"
                fill={color(i(), 1, false)}
                width={tensorWidth()}
                height={tensorDepth()}
                transform={`translate(${tensorDepth()/2}, 0) skewX(-45) scale(1, 0.5)`}
              />
              <rect
                id="front"
                fill={color(i(), 1, false)}
                width={tensorWidth()}
                height={tensorHeight()}
                transform={`translate(0, ${tensorDepth()/2})`}
              />
              <rect
                id="side"
                fill={color(i(), 1, false)}
                width={tensorDepth()}
                height={tensorHeight()}
                transform={`translate(${tensorWidth()}, ${tensorDepth()/2}) skewY(-45) scale(0.5, 1)`}
              />
              <rect
                fill="url(#grid)"
                width={tensorWidth()}
                height={tensorDepth()}
                transform={`translate(${tensorDepth()/2}, 0) skewX(-45) scale(1, 0.5)`}
              />
              <rect
                fill="url(#grid)"
                width={tensorWidth()}
                height={tensorHeight()}
                transform={`translate(0, ${tensorDepth()/2})`}
              />
              <rect
                fill="url(#grid)"
                width={tensorDepth()}
                height={tensorHeight()}
                transform={`translate(${tensorWidth()}, ${tensorDepth()/2}) skewY(-45) scale(0.5, 1)`}
              />
            </g>}
          </For>
          <For each={[/*... new Array(repetition())*/]}>{(_, i) =>
            <g transform={`translate(1000, ${(repetition() - 1 - i())*offset()})`}>
              <rect
                id="top"
                fill={color(i(), 2, false)}
                width={tensorWidth()}
                height={tensorDepth()}
                transform={`translate(${tensorDepth()/2}, 0) skewX(-45) scale(1, 0.5)`}
              />
              <rect
                id="front"
                fill={color(i(), 2, false)}
                width={tensorWidth()}
                height={tensorHeight()}
                transform={`translate(0, ${tensorDepth()/2})`}
              />
              <rect
                id="side"
                fill={color(i(), 2, false)}
                width={tensorDepth()}
                height={tensorHeight()}
                transform={`translate(${tensorWidth()}, ${tensorDepth()/2}) skewY(-45) scale(0.5, 1)`}
              />
              <rect
                fill="url(#grid)"
                width={tensorWidth()}
                height={tensorDepth()}
                transform={`translate(${tensorDepth()/2}, 0) skewX(-45) scale(1, 0.5)`}
              />
              <rect
                fill="url(#grid)"
                width={tensorWidth()}
                height={tensorHeight()}
                transform={`translate(0, ${tensorDepth()/2})`}
              />
              <rect
                fill="url(#grid)"
                width={tensorDepth()}
                height={tensorHeight()}
                transform={`translate(${tensorWidth()}, ${tensorDepth()/2}) skewY(-45) scale(0.5, 1)`}
              />
            </g>}
          </For>
        </svg>
      </div>
    </>
  )
}

export default App
