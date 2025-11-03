import { createRoot } from "react-dom/client";
import { NodeEditor, GetSchemes, ClassicPreset as Classic } from "rete";
import { AreaExtensions } from "rete-area-plugin";
import { Area3D, Area3DPlugin, Area3DExtensions } from "rete-area-3d-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets
} from "rete-connection-plugin";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import { DataflowEngine } from "rete-engine";
import {
  ContextMenuPlugin,
  ContextMenuExtra,
  Presets as ContextMenuPresets
} from "rete-context-menu-plugin";
import { setup3DEnvironment } from "./ocean";
import { MCPToolNode } from "./nodes/MCPToolNode";
import { KnowledgeRAGNode } from "./nodes/KnowledgeRAGNode";
import { MemoryNode } from "./nodes/MemoryNode";
import { ModelNode } from "./nodes/ModelNode";
import { AIAgentNode } from "./nodes/AIAgentNode";

type Node = MCPToolNode | KnowledgeRAGNode | MemoryNode | ModelNode | AIAgentNode;
type Conn =
  | Connection<MCPToolNode, AIAgentNode>
  | Connection<KnowledgeRAGNode, ModelNode>
  | Connection<KnowledgeRAGNode, AIAgentNode>
  | Connection<MemoryNode, ModelNode>
  | Connection<MemoryNode, AIAgentNode>
  | Connection<ModelNode, AIAgentNode>;
type Schemes = GetSchemes<Node, Conn>;

class Connection<A extends Node, B extends Node> extends Classic.Connection<
  A,
  B
> {}

type AreaExtra = ReactArea2D<Schemes> | Area3D<Schemes> | ContextMenuExtra;

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();

  const area = new Area3DPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([
      ["MCP Tool", () => new MCPToolNode("Tool Name")],
      ["Knowledge (RAG)", () => new KnowledgeRAGNode()],
      ["Memory", () => new MemoryNode()],
      ["Model: ChatGPT", () => new ModelNode("ChatGPT")],
      ["Model: Claude", () => new ModelNode("Claude")],
      ["Model: Llama", () => new ModelNode("Llama")],
      ["AI Agent", () => new AIAgentNode()]
    ])
  });
  area.use(contextMenu);

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  render.addPreset(Presets.classic.setup());
  render.addPreset(Presets.contextMenu.setup());

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  Area3DExtensions.forms.node(area);
  Area3DExtensions.forms.connection(render);

  AreaExtensions.simpleNodesOrder(area);

  const dataflow = new DataflowEngine<Schemes>();

  editor.use(dataflow);

  async function process() {
    dataflow.reset();
    // Process agent node if needed
  }

  // Create all nodes
  const mcpTool = new MCPToolNode("GitHub MCP");
  const rag = new KnowledgeRAGNode();
  const memory = new MemoryNode();
  const chatgpt = new ModelNode("ChatGPT");
  const claude = new ModelNode("Claude");
  const llama = new ModelNode("Llama");
  const agent = new AIAgentNode();

  await editor.addNode(mcpTool);
  await editor.addNode(rag);
  await editor.addNode(memory);
  await editor.addNode(chatgpt);
  await editor.addNode(claude);
  await editor.addNode(llama);
  await editor.addNode(agent);

  // Scene loading function
  async function loadScene(sceneNumber: number) {
    // Clear all connections
    editor.getConnections().forEach(conn => {
      editor.removeConnection(conn.id);
    });

    const offset = -400;

    if (sceneNumber === 1) {
      // Scene 1: Full Architecture View
      // Connections
      await editor.addConnection(new Connection(rag, "context", chatgpt, "rag"));
      await editor.addConnection(new Connection(rag, "context", claude, "rag"));
      await editor.addConnection(new Connection(rag, "context", llama, "rag"));
      await editor.addConnection(new Connection(memory, "state", chatgpt, "memory"));
      await editor.addConnection(new Connection(memory, "state", claude, "memory"));
      await editor.addConnection(new Connection(memory, "state", llama, "memory"));
      await editor.addConnection(new Connection(mcpTool, "tool_out", agent, "mcp_tool"));
      await editor.addConnection(new Connection(rag, "context", agent, "rag"));
      await editor.addConnection(new Connection(memory, "state", agent, "memory"));
      await editor.addConnection(new Connection(chatgpt, "response", agent, "chatgpt"));
      await editor.addConnection(new Connection(claude, "response", agent, "claude"));
      await editor.addConnection(new Connection(llama, "response", agent, "llama"));

      // Positions
      await area.translate(mcpTool.id, { x: -600, y: 100 + offset });
      await area.translate(rag.id, { x: -600, y: 300 + offset });
      await area.translate(memory.id, { x: -600, y: 500 + offset });
      await area.translate(agent.id, { x: 0, y: 300 + offset });
      await area.translate(chatgpt.id, { x: 600, y: 100 + offset });
      await area.translate(claude.id, { x: 600, y: 300 + offset });
      await area.translate(llama.id, { x: 600, y: 500 + offset });

    } else if (sceneNumber === 2) {
      // Scene 2: Data Flow Focus (Sources -> Agent)
      await editor.addConnection(new Connection(mcpTool, "tool_out", agent, "mcp_tool"));
      await editor.addConnection(new Connection(rag, "context", agent, "rag"));
      await editor.addConnection(new Connection(memory, "state", agent, "memory"));

      // Circular arrangement around agent
      await area.translate(agent.id, { x: 0, y: 300 + offset });
      await area.translate(mcpTool.id, { x: -500, y: 100 + offset });
      await area.translate(rag.id, { x: -500, y: 500 + offset });
      await area.translate(memory.id, { x: -500, y: 300 + offset });
      // Models off to the side
      await area.translate(chatgpt.id, { x: 500, y: 100 + offset });
      await area.translate(claude.id, { x: 500, y: 300 + offset });
      await area.translate(llama.id, { x: 500, y: 500 + offset });

    } else if (sceneNumber === 3) {
      // Scene 3: Model Integration (Agent -> Models)
      await editor.addConnection(new Connection(chatgpt, "response", agent, "chatgpt"));
      await editor.addConnection(new Connection(claude, "response", agent, "claude"));
      await editor.addConnection(new Connection(llama, "response", agent, "llama"));

      // Agent on left, models on right
      await area.translate(agent.id, { x: -300, y: 300 + offset });
      await area.translate(chatgpt.id, { x: 400, y: 100 + offset });
      await area.translate(claude.id, { x: 400, y: 300 + offset });
      await area.translate(llama.id, { x: 400, y: 500 + offset });
      // Sources far left
      await area.translate(mcpTool.id, { x: -800, y: 100 + offset });
      await area.translate(rag.id, { x: -800, y: 300 + offset });
      await area.translate(memory.id, { x: -800, y: 500 + offset });

    } else if (sceneNumber === 4) {
      // Scene 4: Complete Pipeline (All connections visible)
      await editor.addConnection(new Connection(rag, "context", chatgpt, "rag"));
      await editor.addConnection(new Connection(rag, "context", claude, "rag"));
      await editor.addConnection(new Connection(memory, "state", chatgpt, "memory"));
      await editor.addConnection(new Connection(memory, "state", claude, "memory"));
      await editor.addConnection(new Connection(mcpTool, "tool_out", agent, "mcp_tool"));
      await editor.addConnection(new Connection(chatgpt, "response", agent, "chatgpt"));
      await editor.addConnection(new Connection(claude, "response", agent, "claude"));

      // Linear flow layout
      await area.translate(mcpTool.id, { x: -700, y: 200 + offset });
      await area.translate(rag.id, { x: -700, y: 350 + offset });
      await area.translate(memory.id, { x: -700, y: 500 + offset });
      await area.translate(chatgpt.id, { x: -200, y: 200 + offset });
      await area.translate(claude.id, { x: -200, y: 450 + offset });
      await area.translate(llama.id, { x: 300, y: 600 + offset });
      await area.translate(agent.id, { x: 400, y: 300 + offset });
    }

    Area3DExtensions.lookAt(area, editor.getNodes());
  }

  // Load initial scene
  await loadScene(1);

  // Create scene selector UI
  const sceneSelector = document.createElement('div');
  sceneSelector.className = 'scene-selector';
  sceneSelector.innerHTML = `
    <div class="scene-title">Scenes</div>
    <button class="scene-btn active" data-scene="1">1. Full Architecture</button>
    <button class="scene-btn" data-scene="2">2. Data Flow</button>
    <button class="scene-btn" data-scene="3">3. Model Integration</button>
    <button class="scene-btn" data-scene="4">4. Complete Pipeline</button>
  `;
  container.appendChild(sceneSelector);

  // Add scene button click handlers
  sceneSelector.querySelectorAll('.scene-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const target = e.target as HTMLButtonElement;
      const sceneNum = parseInt(target.dataset.scene || '1');

      // Update active state
      sceneSelector.querySelectorAll('.scene-btn').forEach(b => b.classList.remove('active'));
      target.classList.add('active');

      // Load scene
      await loadScene(sceneNum);
    });
  });

  editor.addPipe((context) => {
    if (
      context.type === "connectioncreated" ||
      context.type === "connectionremoved"
    ) {
      process();
    }
    return context;
  });

  process();

  const { scene } = area.area;

  scene.camera.far = 50000;
  scene.camera.updateProjectionMatrix();

  const { stars, nebula } = setup3DEnvironment(
    scene.renderer.webgl,
    scene.camera,
    scene.root
  );

  Area3DExtensions.lookAt(area, editor.getNodes());

  Area3DExtensions.animate(area, (time) => {
    // Slowly rotate starfield for subtle motion
    if (stars) {
      stars.rotation.y = time * 0.00005;
      stars.rotation.x = time * 0.00002;
    }
    // Rotate nebula slightly slower
    if (nebula) {
      nebula.rotation.y = -time * 0.00003;
      nebula.rotation.z = time * 0.00001;
    }
  });

  return {
    destroy: () => area.destroy()
  };
}
