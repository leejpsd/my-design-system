import {
  useCallback,
  useContext,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { clsx } from 'clsx';
import { TabsContext, type TabsContextValue } from './TabsContext';
import styles from './Tabs.module.css';

// ===== Tabs Root =====

export interface TabsProps {
  /** 기본 선택 탭 값 (비제어) */
  defaultValue?: string;
  /** 현재 선택 탭 값 (제어) */
  value?: string;
  /** 탭 변경 핸들러 */
  onChange?: (value: string) => void;
  children: ReactNode;
}

function TabsRoot({
  defaultValue,
  value: controlledValue,
  onChange,
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (newValue: string) => {
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const ctx: TabsContextValue = { value: currentValue, onChange: handleChange };

  return (
    <TabsContext.Provider value={ctx}>
      <div className={styles.tabs}>{children}</div>
    </TabsContext.Provider>
  );
}

// ===== Tabs.List =====

interface TabsListProps {
  children: ReactNode;
}

function TabsList({ children }: TabsListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const list = listRef.current;
    if (!list) return;

    const triggers = Array.from(
      list.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])',
      ),
    );
    const currentIndex = triggers.findIndex(
      (t) => t === document.activeElement,
    );
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % triggers.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = triggers.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      triggers[nextIndex].focus();
      triggers[nextIndex].click();
    }
  };

  return (
    <div
      ref={listRef}
      className={styles.list}
      role="tablist"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

// ===== Tabs.Trigger =====

interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

function TabsTrigger({ value, disabled = false, children }: TabsTriggerProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.Trigger must be used within Tabs');

  const isSelected = ctx.value === value;

  return (
    <button
      id={`tab-${value}`}
      className={clsx(styles.trigger, isSelected && styles.selected)}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      aria-selected={isSelected}
      aria-controls={`tabpanel-${value}`}
      disabled={disabled}
      onClick={() => ctx.onChange(value)}
    >
      {children}
    </button>
  );
}

// ===== Tabs.Content =====

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

function TabsContent({ value, children }: TabsContentProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.Content must be used within Tabs');

  if (ctx.value !== value) return null;

  return (
    <div
      id={`tabpanel-${value}`}
      className={styles.content}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`tab-${value}`}
    >
      {children}
    </div>
  );
}

// ===== Compound Export =====

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
