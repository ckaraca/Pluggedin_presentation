import { ClassicPreset as Classic } from "rete";
import { DataflowNode } from "rete-engine";
import { socket } from "../socket";

export class ModelNode extends Classic.Node implements DataflowNode {
  width = 250;
  height = 180;

  constructor(modelName: string) {
    super(`Model: ${modelName}`);

    // Multiple inputs for RAG, Memory, and Tools
    this.addInput("rag", new Classic.Input(socket, "RAG"));
    this.addInput("memory", new Classic.Input(socket, "Memory"));
    this.addInput("tools", new Classic.Input(socket, "Tools"));

    // Single output
    this.addOutput("response", new Classic.Output(socket, "Response"));
  }

  data(inputs: { rag?: string[]; memory?: string[]; tools?: string[] }) {
    const { rag = [], memory = [], tools = [] } = inputs;

    return {
      response: `${this.label}_response`
    };
  }
}
