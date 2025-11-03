import { ClassicPreset as Classic } from "rete";
import { DataflowNode } from "rete-engine";
import { socket } from "../socket";

export class DocumentNode extends Classic.Node implements DataflowNode {
  width = 200;
  height = 120;

  constructor(docName: string = "Document") {
    super(docName);

    // Single input to receive output from models
    this.addInput("content", new Classic.Input(socket, "Content"));
  }

  data(inputs: { content?: string[] }) {
    // Terminal node - just receives data
    return {};
  }
}
