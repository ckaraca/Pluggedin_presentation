# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React + TypeScript application demonstrating **Rete.js v2** node-based visual programming with 3D rendering using Three.js. Features a dataflow computation engine with real-time visual feedback rendered on an animated ocean scene.

## Development Commands

```bash
# Start development server
pnpm start  # or npm start

# Build for production
pnpm build

# Run tests
pnpm test
```

## Architecture

### Core Technologies
- **Rete.js v2**: Node-based editor framework (major version - breaking changes from v1)
- **React 18**: UI rendering with createRoot API
- **Three.js**: 3D scene rendering (Water, Sky effects)
- **TypeScript**: Strict mode enabled
- **react-scripts**: CRA-based build system

### Key Architectural Components

#### 1. Editor System (`src/editor.ts`)
The central orchestrator that wires together all plugins:

- **NodeEditor**: Core Rete editor instance managing node graph state
- **Area3DPlugin**: Renders nodes in 3D space instead of 2D canvas
- **ConnectionPlugin**: Handles wire connections between nodes
- **ReactPlugin**: Renders Rete nodes as React components
- **ContextMenuPlugin**: Right-click menu for adding nodes
- **DataflowEngine**: Computes values by traversing node graph

**Important**: The editor uses a **pipe system** (line 106-114) to trigger recomputation on connection changes. This is the reactive core of the dataflow system.

#### 2. Node System (`src/nodes/`)
Nodes implement **both** `Classic.Node` and `DataflowNode` interfaces:

- **NumberNode**: Source node with input control
- **AddNode**: Operation node that sums two inputs

**Pattern**: Each node's `data()` method defines its computation. The engine calls these methods in topological order when `dataflow.fetch(nodeId)` is invoked.

#### 3. 3D Environment (`src/ocean.ts`)
Sets up Three.js ocean scene:
- Animated water plane using Water shader
- Procedural sky using Sky shader
- PMREM environment mapping for lighting
- Animation loop updates water time uniform

**Integration**: The 3D scene is provided by `Area3DPlugin.area.scene`, which exposes Three.js primitives (camera, renderer, root scene).

#### 4. Type System
The type system enforces connection compatibility:

```typescript
type Schemes = GetSchemes<Node, Conn>
```

This constrains which nodes can connect based on socket types defined in `socket.ts`. Currently uses a single universal socket, but the architecture supports typed connections.

## Key Implementation Details

### Dataflow Processing Pattern
When connections change, the system:
1. Resets the dataflow engine (`dataflow.reset()`)
2. Finds all `AddNode` instances
3. Calls `dataflow.fetch(node.id)` on each
4. Updates UI controls with computed values via `area.update()`

This "pull-based" approach means AddNodes pull values from their inputs recursively.

### Area3D Integration
The `Area3DExtensions` provide key functionality:
- `forms.node(area)`: Enables node geometry/positioning
- `forms.connection(render)`: Enables 3D wire rendering
- `lookAt(area, nodes)`: Frames camera on nodes
- `animate(area, callback)`: Animation loop for water effect

### Plugin Ordering
The plugin registration order matters:
1. Editor uses Area3D
2. Area3D uses Connection
3. Area3D uses React render
4. Plugins must be registered before nodes are added

## Development Notes

### Adding New Node Types
1. Create class in `src/nodes/` extending `Classic.Node` and `DataflowNode`
2. Define inputs/outputs with sockets
3. Implement `data(inputs)` method for computation
4. Add to context menu in `editor.ts`
5. Update union types (`Node`, `Conn`, `Schemes`)

### Socket System
Currently uses a single universal socket (`src/socket.ts`). To add typed connections:
- Create multiple socket instances
- Assign to specific input/output ports
- Connection plugin enforces socket compatibility automatically

### 3D Camera
Camera far plane is extended to 50000 (line 120-121) to accommodate the large ocean geometry. Without this, the water plane clips.
