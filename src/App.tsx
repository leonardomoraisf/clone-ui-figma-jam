import ReactFlow, { Background, Connection, ConnectionMode, Controls, addEdge, useEdgesState, useNodesState } from 'reactflow';
import * as Toolbar from '@radix-ui/react-toolbar';
import { zinc } from 'tailwindcss/colors';
import 'reactflow/dist/style.css';

import { Square } from './components/nodes/Square';
import { useCallback } from 'react';
import DefaultEdge from './edges/DefaultEdge';
import { Diamond } from './components/nodes/Diamond';
import { Circle } from './components/nodes/Circle';

// Nodes(coisas na tela), Edges(conexões)

const NODE_TYPES = {
  square: Square,
  diamond: Diamond,
  circle: Circle,
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 400,
      y: 200,
    },
    data: {

    },
  },
] satisfies Node[]

function App() {

  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  function addSquareNode(){

    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 750,
          y: 350,
        },
        data: {
    
        },
      },
    ])

  }

  function addDiamondNode(){

    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'diamond',
        position: {
          x: 1050,
          y: 350,
        },
        data: {
    
        },
      },
    ])

  }

  function addCircleNode(){

    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'circle',
        position: {
          x: 550,
          y: 350,
        },
        data: {
    
        },
      },
    ])

  }

  return (

    <div className='w-screen h-screen'>

      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{ 
          type: 'default',
         }}
      >

          <Background 
            gap={12}
            size={2}
            color={zinc[200]}
          />

        <Controls />

      </ReactFlow>

      <Toolbar.Root className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-120 overflow-hidden'>

        <Toolbar.Button 
          className="w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-2" 
          onClick={addSquareNode}
        />

        <Toolbar.Button 
          className="w-32 h-32 bg-violet-500 mt-10 ml-12 rounded transition-transform hover:-translate-y-2 rotate-45" 
          onClick={addDiamondNode}
        />

        <Toolbar.Button 
          className="w-32 h-32 bg-violet-500 mt-10 ml-12 rounded-full transition-transform hover:-translate-y-2" 
          onClick={addCircleNode}
        />

      </Toolbar.Root>

   </div>

  )
}

export default App
