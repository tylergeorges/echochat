'use client';

import { useSignIn } from '@/hooks/use-sign-in';

import { Column, Row } from '@/components/flex';
import { Icons } from '@/components/icons';
import { LoginButton } from '@/components/login-button';
import { ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HeroBadgeButton = () => {
  const [signIn] = useSignIn();

  return (
    <button
      type="button"
      className={cn(
        'border-tra focus-visible:riz-10 group relative z-10 cursor-pointer overflow-hidden rounded-full border-indigo-400/40  bg-indigo-500/20 px-3 py-0.5 pr-1 text-xs font-medium text-indigo-400 outline-none border ring-indigo-900 transition horizontal center',
        ' '
      )}
      onClick={() => {
        signIn();
      }}
    >
      <div className="relative gap-1 transition duration-300 horizontal center group-hover:-translate-y-5">
        Jump Into the Fun
        <Icons.ChevronRight className="size-3" />
      </div>

      <div className="absolute translate-y-5 gap-1 transition duration-300 horizontal center-v group-hover:translate-y-0">
        Jump Into the Fun
        <Icons.ChevronRight className="size-3" />
      </div>
    </button>
  );
};

export const Hero = () => {
  return (
    <Column className="prose h-full w-full animate-fade-up text-center center animate-delay-75">
      <div className="container mx-auto w-full max-w-full px-4 lg:max-w-6xl lg:px-16">
        <Column className="mx-auto max-w-[592px] center vertical">
          <HeroBadgeButton />

          <Column className="mt-6 text-balance text-center center-h">
            <h1 className="m-0 animate-fade-up text-[52px] animate-delay-75 lg:text-[80px] lg:leading-[76px]">
              Make your
              <div className="text-indigo-400">words echo</div>
            </h1>

            <p className="mb-0 mt-4 animate-fade-up text-balance text-center animate-delay-100">
              Echo your words and create ripples that engage your entire community.
            </p>
          </Column>

          <Row className="mt-6 w-full animate-fade-up gap-4 text-foreground center animate-delay-150 lg:mt-8">
            <LoginButton className="group" size="xl">
              <span className="transition duration-300 group-hover:-translate-x-2">
                Get Started
              </span>

              <Icons.RightArrow className="absolute right-1 size-5 translate-x-full text-current opacity-0 transition duration-300 group-hover:-translate-x-1 group-hover:opacity-100" />
            </LoginButton>

            <ButtonLink
              className="group relative size-14 overflow-hidden"
              target="_blank"
              size="icon"
              variant="outline"
              color="secondary"
              href={'https://github.com/tylergeorges/echochat'}
            >
              <Icons.GitHub className="size-6 text-current" />
            </ButtonLink>
          </Row>
        </Column>
      </div>
    </Column>
  );
};
