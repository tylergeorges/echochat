import { formatTimestamp } from '@/lib/format-timestamp';
import { cn } from '@/lib/utils';

interface TimestampProps {
  timestamp: Date;
  className?: string;
}

export const Timestamp = ({ timestamp, className }: TimestampProps) => {
  const formattedTimestamp = formatTimestamp(timestamp);

  return (
    <time
      className={cn('h-5 text-xs leading-5', className)}
      aria-label={formattedTimestamp}
      dateTime={timestamp.toISOString()}
    >
      {formattedTimestamp}
    </time>
  );
};
