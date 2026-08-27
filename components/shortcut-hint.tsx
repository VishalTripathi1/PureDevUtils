"use client";

// The action shortcut is Ctrl+Enter — kept as a plain, fixed label rather
// than switching per OS. (Cmd+Enter also works on Mac under the hood since
// the keydown handlers accept event.metaKey as well as event.ctrlKey; only
// the displayed text is fixed here.)
export function useModifierKey() {
  return "Ctrl" as const;
}

export function ShortcutHint() {
  return <kbd>Ctrl ↵</kbd>;
}
