import { ClassicPreset as Classic } from "rete";
import { DataflowNode } from "rete-engine";
import { socket } from "../socket";

export class KnowledgeRAGNode extends Classic.Node implements DataflowNode {
  width = 220;
  height = 120;

  constructor() {
    super("Knowledge (RAG)");

    this.addOutput("context", new Classic.Output(socket, "Context"));
  }

  data() {
    return {
      context: "knowledge_context"
    };
  }
}
