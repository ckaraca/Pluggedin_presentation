import { ClassicPreset as Classic } from "rete";
import { DataflowNode } from "rete-engine";
import { socket } from "../socket";

export class NativeToolNode extends Classic.Node implements DataflowNode {
  width = 240;
  height = 140;

  constructor(
    initial: string = "Native Tool",
    change?: (value: string) => void
  ) {
    super("Native Tool");

    this.addOutput("tool_out", new Classic.Output(socket, "Tool Output"));
    this.addControl(
      "toolName",
      new Classic.InputControl("text", { initial, change })
    );
  }

  data() {
    const toolName = (this.controls["toolName"] as Classic.InputControl<"text">)
      .value;

    return {
      tool_out: toolName
    };
  }
}
