import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Form from "./Form";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const basePost = {
  prompt: "Write a short story",
  tag: "#story",
};

function renderForm(overrides = {}) {
  const props = {
    type: "Create",
    post: basePost,
    setPost: vi.fn(),
    submitting: false,
    handleSubmit: vi.fn((event) => event.preventDefault()),
    ...overrides,
  };

  return {
    ...render(<Form {...props} />),
    props,
  };
}

describe("Form", () => {
  it("marks the prompt and tag fields as required", () => {
    renderForm();

    expect(screen.getByPlaceholderText("Write your prompt here...")).toBeRequired();
    expect(screen.getByPlaceholderText("#tag")).toBeRequired();
  });

  it("disables the submit button while submitting", () => {
    renderForm({ submitting: true });

    const submitButton = screen.getByRole("button", { name: "Create..." });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("keeps the submit button enabled when not submitting", () => {
    renderForm({ submitting: false });

    const submitButton = screen.getByRole("button", { name: "Create" });
    expect(submitButton).toBeEnabled();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("links cancel back to the home page", () => {
    renderForm();

    expect(screen.getByRole("link", { name: "cancel" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("calls setPost when the prompt or tag changes", () => {
    const setPost = vi.fn();

    renderForm({ setPost });

    fireEvent.change(screen.getByPlaceholderText("Write your prompt here..."), {
      target: { value: "New prompt" },
    });

    expect(setPost).toHaveBeenCalledWith({
      ...basePost,
      prompt: "New prompt",
    });

    fireEvent.change(screen.getByPlaceholderText("#tag"), {
      target: { value: "#idea" },
    });

    expect(setPost).toHaveBeenCalledWith({
      ...basePost,
      tag: "#idea",
    });
  });

  it("calls handleSubmit when the form is submitted", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn((event) => event.preventDefault());

    renderForm({ handleSubmit });

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
