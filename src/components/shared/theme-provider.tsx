"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function ThemeKeyboardShortcut() {
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() !== "t" ||
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
      ) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]'
        )
      ) {
        return;
      }

      if (resolvedTheme === "light" || resolvedTheme === "dark") {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resolvedTheme, setTheme]);

  return null;
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeKeyboardShortcut />
      {children}
    </NextThemesProvider>
  );
}
