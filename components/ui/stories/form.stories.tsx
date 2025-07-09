import type { Meta, StoryObj } from "@storybook/react"
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

const meta: Meta<typeof Form> = {
  title: "UI/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
    }

    return (
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormDescription>
                    We'll never share your email with anyone else.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="your@email.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="justify-normal px-0 font-normal"
                  >
                    <p>Forgot password?</p>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    )
  },
}

export const SomeMode: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
      mode: "onSubmit", // Enable validation on submit
    })

    const handleSubmit = (data: any) => {
      console.log("Form submitted:", data)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="your@email.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message || "Invalid email"}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message || "Invalid password"}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    )
  },
}

export const AutoValidation: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
    })

    const handleSubmit = (data: any) => {
      console.log("Form submitted:", data)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="your@email.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message || "Invalid email"}
                </FormMessage>
              </FormItem>
            )}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message || "Invalid password"}
                </FormMessage>
              </FormItem>
            )}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    )
  },
}
