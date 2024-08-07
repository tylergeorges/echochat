import { Column } from '@/components/flex';
import { Icons } from '@/components/icons';
import { MessageForm } from '@/components/message-form';
import { Message } from '@/lib/db/queries/message';
import { Channel } from '@/lib/db/schema';

// interface Author {
//   avatar_url: string;
//   username: string;
// }

// interface Message {
//   content: string;
//   created_at: string;
//   id: number;
//   author: Author;
// }

// const user1: Author = {
//   avatar_url:
//     'https://static.wikia.nocookie.net/multiversology/images/c/c5/Asriel_Dreemurr.jpg/revision/latest/scale-to-width-down/400?cb=20201103215550',
//   username: 'kneadle'
// };

// const messages: Message[] = [
//   {
//     author: user1,
//     content: 'feefwfqf[sdoifp[sad[fpo]]]',
//     created_at: Date(),
//     id: 0
//   },
//   {
//     author: user1,
//     content:
//       'rewrweqrewqqqqqqqqqqqqqqqqfgdsgdgbfdsgdfsgdsgdfsrewrweqrewqqqqqqqqqqqqqqqqfgdsgdgbfdsgdfsgdsgdfsrewrweqrewqqqqqqqqqqqqqqqqfgdsgdgbfdsgdfsgdsgdfs]',
//     created_at: Date(),
//     id: 1
//   },
//   {
//     author: user1,
//     content:
//       'rewrweqrewqqqqqqqqqqqqqqqqfgdsgdgbfdsgdfsgdsgdfsLoremIpsumIDFOWEIOPEQRIOPWQJIFDSkfldsaNFDSLKJ:FSD',
//     created_at: Date(),
//     id: 2
//   }
// ];

interface ChannelContainerProps {
  channel: Channel;
  messages: Message[];
}

export const ChannelContainer = ({ channel, messages }: ChannelContainerProps) => (
  <Column className="relative size-full flex-1">
    <header className="text-md flex h-12 items-center border-b border-foreground/15 px-3 font-semibold">
      <Icons.TextChannelHash className="mr-2 text-channel-icon" />
      {channel.name}
    </header>

    <Column className="size-full justify-end">
      <Column className="mb-4 justify-end p-4">
        <div className="size-min rounded-full bg-interactive-muted/50 p-2">
          <Icons.TextChannelHash className="size-12 text-interactive-active" />
        </div>

        <Column>
          <h1 className="text-3xl font-bold">Welcome to #general</h1>
          <p className="text-sm text-channel-icon">
            This is the start of the #{channel.name} channel.
          </p>
        </Column>
      </Column>

      <div className="">
        {messages.map(message => (
          <div className="gap-2 p-4 horizontal" key={message.id}>
            <img src={message.author.avatarUrl} className="aspect-square size-10 rounded-full" />

            <Column className="">
              <div className="gap-2 horizontal center-v">
                <h1 className="font-semibold text-interactive-active">{message.author.username}</h1>
                <p className="text-sm text-interactive-muted">
                  {message.createdAt.toLocaleString()}
                </p>
              </div>

              <div className="whitespace-pre-wrap text-wrap break-all text-sm text-foreground">
                {message.content}
              </div>
            </Column>
          </div>
        ))}
      </div>
      <MessageForm channel={channel} />
    </Column>
  </Column>
);
