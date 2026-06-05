"use client";
import { LangProvider } from "./contexts/LanguageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LangProvider>{children}</LangProvider>;
}