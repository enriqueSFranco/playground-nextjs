import { useEffect, useState } from "react"

type Dimensions = {
  width: number
  height: number
}

export const useDimension = ({containerRef}: {containerRef: React.RefObject<HTMLElement>}) => {
  const [dimensions, setDimensions] = useState<Dimensions>({width: 0, height: 0})

  useEffect(() => {
    const currElem = containerRef.current

    if (!currElem) return

    function getDimensions() {
      return {
        width: currElem.offsetWidth || 0,
        height: currElem.offsetHeight || 0
      }
    }
  
    // Creamos un ResizeObserver para escuchar cambios de tamaño
    const resizeObserver = new ResizeObserver(entries => {
      let entry = entries[0]
      if (entry) {
        setDimensions(getDimensions())
      }
    })

    resizeObserver.observe(currElem)
    setDimensions(getDimensions())

    return () => {
      resizeObserver.unobserve(currElem)
      resizeObserver.disconnect()
    }
  }, [containerRef])

  return dimensions
}
