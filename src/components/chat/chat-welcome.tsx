import { Column } from '@/components/flex';
import { Icons } from '@/components/icons';

interface ChatWelcomeProps {
  channelName: string;
}

export const ChatWelcome = ({ channelName }: ChatWelcomeProps) => (
  <Column className="mt-auto flex-1 select-none justify-end p-4">
    <div className="size-min rounded-full bg-interactive-muted/50 p-2 terminal:rounded-none">
      <Icons.TextChannelHash className="size-12 text-interactive-active" />
    </div>

    <h1 className="text-3xl font-bold">Welcome to {channelName}</h1>
    <p className="text-muted-foreground">This is the start of the {channelName} channel.</p>
  </Column>
);
