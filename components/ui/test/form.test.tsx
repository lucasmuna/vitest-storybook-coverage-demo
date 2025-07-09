import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import React from "react"
import { useFormField } from "@/components/ui/form"

function TestComponent() {
  // Call useFormField without wrapping in FormFieldContext
  useFormField()
  return <div>Test</div>
}

describe("useFormField", () => {
  it("should throw an error if used outside of FormField", () => {
    expect(() => render(<TestComponent />)).toThrowError(
      "useFormField should be used within <FormField>"
    )
  })
})
