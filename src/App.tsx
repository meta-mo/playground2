import React, { useEffect, useRef } from 'react'
import { DataSet } from 'vis-data'
import { Data, Edge, Network, Node, Options } from 'vis-network'

interface Item extends Node {
  id: number
  shape: string
  image: string
  label?: string
}

const nodes = new DataSet<Item, 'id'>([
  {
    id: 1,
    shape: 'circularImage',
    image: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kjx130/20180324/20180324125714.jpg'
  },
  {
    id: 2,
    shape: 'circularImage',
    image: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kjx130/20180324/20180324125714.jpg'
  },
  {
    id: 3,
    shape: 'circularImage',
    image: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kjx130/20180324/20180324125714.jpg'
  },
  {
    id: 4,
    shape: 'circularImage',
    image: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kjx130/20180324/20180324125714.jpg',
    label: 'pictures by this guy!'
  },
  {
    id: 5,
    shape: 'circularImage',
    image: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kjx130/20180324/20180324125714.jpg'
  },
  {
    id: 6,
    shape: 'circularImage',
    image: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kjx130/20180324/20180324125714.jpg'
  },
  {
    id: 16,
    shape: 'circularImage',
    image: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kjx130/20180324/20180324125714.jpg',
    label: 'fallback image in action'
  }
])

// create an array with edges
const edges = new DataSet<Edge>([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 }
])

const data: Data = {
  nodes: nodes,
  edges: edges
}
const options: Options = {
  nodes: {
    borderWidth: 4,
    size: 30,
    color: {
      border: '#222222',
      background: '#666666'
    },
    font: { color: '#666' }
  },
  edges: {
    color: '#666',
    width: 6
  }
}

export const App = () => {
  const element = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!element.current) return
    const network = new Network(element.current, data, options)

    network.on('click', (properties: any) => {
      const ids = properties.nodes
      const clickedNodes = nodes.get(ids)
      if (!clickedNodes.length) return
      console.log('clicked nodes:', clickedNodes)
      console.log(network.getPositions(clickedNodes[0].id))
      alert(`clicked nodeId:${clickedNodes[0].id}`)
    })
  }, [element, data, options])

  const createId = (ids: number[]): number => {
    const num = Math.floor(Math.random() * 100) + 1

    if (ids.includes(num)) {
      return createId(ids)
    } else {
      return num
    }
  }

  const onAdd = () => {
    const data = nodes.getIds() as number[]
    const id = createId(data)
    nodes.add({
      id,
      shape: 'circularImage',
      image: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kjx130/20180324/20180324125714.jpg'
    })
  }
  const onDel = () => {
    const data = nodes.getIds() as number[]
    const id = data[Math.floor(Math.random() * data.length)]
    nodes.remove(id)
  }

  return (
    <div className="App container mx-auto">
      <div className="w-144 h-144 mt-12 mx-auto bg-gray-300" ref={element}></div>
      <div className="mt-8 mx-auto text-center">
        <button onClick={onAdd} className="bg-gray-300 px-1 m-2">
          Add
        </button>
        <button onClick={onDel} className="bg-gray-300 px-1 m-2">
          Random Remove
        </button>
      </div>
    </div>
  )
}
