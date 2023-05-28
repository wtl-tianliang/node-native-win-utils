import EventEmitter = require("events");
import path from "path";

const bindings = require("node-gyp-build")(path.resolve(__dirname, ".."));

import keyCodes from "./keyCodes";

type WindowData = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type GetWindowData = (windowName: string) => WindowData;
export type CaptureWindow = (windowName: string, outputPath: string) => void;
export type KeyDownHandler = (callback: (keyCode: number) => void) => void;
export type KeyUpHandler = (callback: (keyCode: number) => void) => void;

export interface KeyListener extends EventEmitter {
  on(
    event: "keyDown",
    callback: (data: { keyCode: number; keyName: string }) => void
  ): this;
  on(
    event: "keyUp",
    callback: (data: { keyCode: number; keyName: string }) => void
  ): this;
}

const {
  keyDownHandler,
  keyUpHandler,
  getWindowData,
  captureWindow,
}: {
  keyDownHandler: KeyDownHandler;
  keyUpHandler: KeyUpHandler;
  getWindowData: GetWindowData;
  captureWindow: CaptureWindow;
} = bindings;
export class KeyListener extends EventEmitter {
  constructor() {
    super();
    keyDownHandler((keyCode: number) => {
      const keyName: string | undefined = keyCodes.get(keyCode.toString());
      this.emit("keyDown", {
        keyCode,
        keyName,
      });
    });
    keyUpHandler((keyCode: number) => {
      const keyName: string | undefined = keyCodes.get(keyCode.toString());
      this.emit("keyUp", {
        keyCode,
        keyName,
      });
    });
  }
}

export { keyDownHandler, keyUpHandler, getWindowData, captureWindow };
