import { Column } from '@/components/flex';
import { Icons } from '@/components/icons';

interface Author {
  avatar_url: string;
  username: string;
}

interface Message {
  content: string;
  created_at: string;
  id: number;
  author: Author;
}

const user1: Author = {
  avatar_url:
    'https://static.wikia.nocookie.net/multiversology/images/c/c5/Asriel_Dreemurr.jpg/revision/latest/scale-to-width-down/400?cb=20201103215550',
  username: 'kneadle'
};

const messages: Message[] = [
  {
    author: user1,
    content: 'feefwfqf[sdoifp[sad[fpo]]]',
    created_at: Date(),
    id: 0
  },
  {
    author: user1,
    content:
      'rewrweqrewqqqqqqqqqqqqqqqqfgdsgdgbfdsgdfsgdsgdfsrewrweqrewqqqqqqqqqqqqqqqqfgdsgdgbfdsgdfsgdsgdfsrewrweqrewqqqqqqqqqqqqqqqqfgdsgdgbfdsgdfsgdsgdfs]',
    created_at: Date(),
    id: 1
  },
  {
    author: user1,
    content:
      'rewrweqrewqqqqqqqqqqqqqqqqfgdsgdgbfdsgdfsgdsgdfsLoremIpsumIDFOWEIOPEQRIOPWQJIFDSkfldsaNFDSLKJ:FSD',
    created_at: Date(),
    id: 2
  }
];

const ServerContainer = () => (
  <Column className="relative size-full flex-1">
    <header className="text-md flex h-12 items-center border-b border-foreground/15 px-3 font-semibold">
      <Icons.TextChannelHash className="text-channel-icon mr-2" />
      general
    </header>

    <Column className="size-full justify-end">
      <Column className="mb-4 justify-end p-4">
        <div className="bg-interactive-muted/50 size-min rounded-full p-2">
          <Icons.TextChannelHash className="text-interactive-active size-12" />
        </div>

        <Column>
          <h1 className="text-3xl font-bold">Welcome to #general</h1>
          <p className="text-channel-icon text-sm">This is the start of the #general channel.</p>
        </Column>
      </Column>

      <div className="">
        {messages.map(message => (
          <div className="gap-2 p-4 horizontal" key={message.id}>
            <img src={message.author.avatar_url} className="aspect-square size-10 rounded-full" />

            <Column className="">
              <div className="gap-2 horizontal center-v">
                <h1 className="text-interactive-active font-semibold">{message.author.username}</h1>
                <p className="text-interactive-muted text-sm">{message.created_at}</p>
              </div>

              <div className="whitespace-pre-wrap text-wrap break-all text-sm text-foreground">
                {message.content}
              </div>
            </Column>
          </div>
        ))}
      </div>
      <div className="w-full p-4 pb-6">
        <input
          className="h-10 w-full rounded-md bg-input px-2.5 outline-none ring-0"
          placeholder="Message #general"
        />
      </div>
    </Column>
  </Column>
);

export default function Home() {
  return (
    <main className="relative flex-1 horizontal">
      <aside className="z-30 hidden h-full w-[72px] flex-col bg-background-tertiary md:flex">
        <div className="flex flex-col items-center space-y-4 py-3 text-primary">
          <div className="group relative mx-3 flex size-12 overflow-hidden rounded-[50%] bg-background text-primary transition-all group-hover:rounded-[16px]" />
        </div>
      </aside>

      <aside className="z-20 w-[240px] bg-background-secondary vertical">
        <div className="">{`Kneadle's Server`}</div>
      </aside>

      <ServerContainer />
    </main>
  );
}
