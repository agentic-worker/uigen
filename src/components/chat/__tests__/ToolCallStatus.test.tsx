import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallStatus } from "../ToolCallStatus";

afterEach(() => {
  cleanup();
});

test("shows 'Creating' label for str_replace_editor create command", () => {
  render(
    <ToolCallStatus
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="result"
    />
  );
  expect(screen.getByText("Creating App.jsx")).toBeDefined();
});

test("shows 'Editing' label for str_replace_editor str_replace command", () => {
  render(
    <ToolCallStatus
      toolName="str_replace_editor"
      args={{ command: "str_replace", path: "/components/Card.jsx" }}
      state="result"
    />
  );
  expect(screen.getByText("Editing Card.jsx")).toBeDefined();
});

test("shows 'Editing' label for str_replace_editor insert command", () => {
  render(
    <ToolCallStatus
      toolName="str_replace_editor"
      args={{ command: "insert", path: "/utils/helpers.ts" }}
      state="result"
    />
  );
  expect(screen.getByText("Editing helpers.ts")).toBeDefined();
});

test("shows 'Reading' label for str_replace_editor view command", () => {
  render(
    <ToolCallStatus
      toolName="str_replace_editor"
      args={{ command: "view", path: "/App.jsx" }}
      state="result"
    />
  );
  expect(screen.getByText("Reading App.jsx")).toBeDefined();
});

test("shows 'Deleting' label for file_manager delete command", () => {
  render(
    <ToolCallStatus
      toolName="file_manager"
      args={{ command: "delete", path: "/old-file.tsx" }}
      state="result"
    />
  );
  expect(screen.getByText("Deleting old-file.tsx")).toBeDefined();
});

test("shows 'Renaming' label with both file names for file_manager rename command", () => {
  render(
    <ToolCallStatus
      toolName="file_manager"
      args={{ command: "rename", path: "/old.tsx", new_path: "/new.tsx" }}
      state="result"
    />
  );
  expect(screen.getByText("Renaming old.tsx → new.tsx")).toBeDefined();
});

test("shows spinner when state is not 'result'", () => {
  const { container } = render(
    <ToolCallStatus
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="call"
    />
  );
  const spinner = container.querySelector(".animate-spin");
  expect(spinner).not.toBeNull();
});

test("shows icon without spinner when state is 'result'", () => {
  const { container } = render(
    <ToolCallStatus
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="result"
    />
  );
  const spinner = container.querySelector(".animate-spin");
  expect(spinner).toBeNull();
});

test("falls back to toolName for unknown tools", () => {
  render(
    <ToolCallStatus
      toolName="some_unknown_tool"
      args={{}}
      state="result"
    />
  );
  expect(screen.getByText("some_unknown_tool")).toBeDefined();
});

test("handles missing path gracefully", () => {
  render(
    <ToolCallStatus
      toolName="str_replace_editor"
      args={{ command: "create" }}
      state="result"
    />
  );
  expect(screen.getByText("Creating")).toBeDefined();
});
