'use client';

import { forwardRef } from 'react';
import { Components } from 'react-virtuoso';

import type { Message } from '@/lib/db/queries/message';

import { ChatWelcome } from '@/components/chat/chat-welcome';

export interface MessageListContext {
  channelName: string;
}

type MessageListComponents = Components<
  Message,
  {
    channelName: string;
  }
>;

export const Scroller: MessageListComponents['Scroller'] = forwardRef(
  ({ style, children, ...props }, ref) => {
    return (
      <div style={style} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
export const Item: MessageListComponents['Item'] = ({ style, children, ...props }) => {
  return (
    <div style={style} {...props}>
      {props['data-index'] === 0 && <ChatWelcome channelName={props?.context?.channelName ?? ''} />}

      {children}
    </div>
  );
};

export const EmptyPlaceholder: MessageListComponents['EmptyPlaceholder'] = ({ context }) => (
  <ChatWelcome channelName={context?.channelName ?? ''} />
);

export const components = {
  //   Scroller
  EmptyPlaceholder: EmptyPlaceholder,
  Item
};
