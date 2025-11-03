import { ClassicPreset as Classic } from "rete";
import { DataflowNode } from "rete-engine";
import { socket } from "../socket";

export class AIAgentNode extends Classic.Node implements DataflowNode {
  width = 300;
  height = 250;

  constructor() {
    super("AI Agent");

    // Multiple inputs from various sources
    this.addInput("chatgpt", new Classic.Input(socket, "ChatGPT"));
    this.addInput("claude", new Classic.Input(socket, "Claude"));
    this.addInput("llama", new Classic.Input(socket, "Llama"));
    this.addInput("mcp_tool", new Classic.Input(socket, "MCP Tool"));
    this.addInput("rag", new Classic.Input(socket, "RAG"));
    this.addInput("memory", new Classic.Input(socket, "Memory"));

    // Single output
    this.addOutput("action", new Classic.Output(socket, "Action"));
  }

  data(inputs: {
    chatgpt?: string[];
    claude?: string[];
    llama?: string[];
    mcp_tool?: string[];
    rag?: string[];
    memory?: string[];
  }) {
    return {
      action: "agent_action"
    };
  }
}
