import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/format';

const control =
  'w-full min-h-12 rounded-control border border-ink/25 bg-surface px-4 py-3 text-base text-ink ' +
  'placeholder:text-ink-3 transition-colors hover:border-ink/45 focus:border-pulse focus:outline-none ' +
  'focus-visible:ring-3 focus-visible:ring-pulse/25';

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  children: (ids: { id: string; describedBy?: string }) => ReactNode;
  className?: string;
}

function FieldShell({ label, hint, error, children, className }: FieldShellProps) {
  const id = useId();
  const noteId = `${id}-note`;
  const note = error ?? hint;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-small font-semibold text-ink">
        {label}
      </label>
      {children({ id, describedBy: note ? noteId : undefined })}
      {note && (
        <p id={noteId} className={cn('text-small', error ? 'text-alert' : 'text-ink-3')}>
          {note}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export function TextField({ label, hint, error, wrapperClassName, className, ...rest }: TextFieldProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={wrapperClassName}>
      {({ id, describedBy }) => (
        <input
          id={id}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={cn(control, className)}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

type AreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string; error?: string };

export function TextArea({ label, hint, error, className, ...rest }: AreaProps) {
  return (
    <FieldShell label={label} hint={hint} error={error}>
      {({ id, describedBy }) => (
        <textarea
          id={id}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={cn(control, 'resize-y', className)}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
};

export function SelectField({ label, options, className, ...rest }: SelectProps) {
  return (
    <FieldShell label={label}>
      {({ id }) => (
        <select id={id} className={cn(control, 'appearance-none pr-10', className)} {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}
