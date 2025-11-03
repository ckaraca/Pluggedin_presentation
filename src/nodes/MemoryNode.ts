import { ClassicPreset as Classic } from "rete";
import { DataflowNode } from "rete-engine";
import { socket } from "../socket";

export class MemoryNode extends Classic.Node implements DataflowNode {
  width = 200;
  height = 120;

  constructor() {
    super("Memory");

    this.addOutput("state", new Classic.Output(socket, "State"));
  }

  data() {
    return {
      state: "memory_state"
    };
  }
}
