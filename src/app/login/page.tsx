import { Metadata } from "next"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Login - Sorci Digit",
  description: "Sign in to your Sorci Digit account to access your marketing dashboard.",
}

export default function LoginPage() {
  return <LoginForm />
}