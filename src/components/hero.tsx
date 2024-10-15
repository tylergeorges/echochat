'use client';

import Image from 'next/image';

import { useSignIn } from '@/hooks/use-sign-in';

import { cn } from '@/lib/utils';

import { Column, Row } from '@/components/flex';
import { Icons } from '@/components/icons';
import { LoginButton } from '@/components/login-button';
import { ButtonLink } from '@/components/ui/button';

const HeroBadgeButton = () => {
  const [signIn] = useSignIn();

  return (
    <button
      type="button"
      className={cn(
        'border-tra focus-visible:riz-10 group relative z-10 w-fit translate-y-[-1rem] animate-fade-in cursor-pointer overflow-hidden rounded-full border border-indigo-400/40 bg-indigo-500/20 px-3 py-0.5 pr-1 text-xs font-medium text-indigo-400 opacity-0 outline-none ring-indigo-900 transition horizontal center [--animation-delay:200ms]',
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
    <Column className="h-full w-full flex-1 text-center center">
      <div className="relative size-full flex-1 grid-cols-[repeat(2,_minmax(0,1fr))] gap-8 px-[max(5vw,(100vw_-_1160px)/2)] py-[120px] vertical md:grid md:items-center">
        <Column className="w-fit justify-start text-left center-v">
          <HeroBadgeButton />

          <h1 className="text relative mx-0 w-full translate-y-[-1rem] animate-fade-in text-balance to-foreground pt-5 text-left text-5xl font-bold leading-[1.1] tracking-tighter text-white opacity-0 [--animation-delay:400ms] sm:text-7xl md:py-2">
            Make your words echo
          </h1>

          <p className="text-md translate-y-[-1rem] animate-fade-in text-lg font-medium text-foreground/50 opacity-0 [--animation-delay:800ms] md:text-lg">
            Echo your words and create ripples that engage your entire community.
          </p>

          <Row className="mt-6 w-full gap-4 text-foreground lg:mt-8">
            <LoginButton
              size="xl"
              className="group -translate-y-[1rem] animate-fade-in opacity-0 transition-none [--animation-delay:1000ms]"
            >
              <span className="group transition duration-300 group-hover:-translate-x-2">
                Get Started
              </span>

              <Icons.RightArrow className="absolute right-1 size-5 translate-x-full text-current opacity-0 transition duration-300 group-hover:-translate-x-1 group-hover:opacity-100" />
            </LoginButton>

            <ButtonLink
              className="group relative size-14 -translate-y-[1rem] animate-fade-in overflow-hidden opacity-0 transition-none [--animation-delay:1000ms]"
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

        <div className="animate-fade-to-left relative w-[60rem] opacity-0 [--animation-delay:400ms] before:absolute before:bottom-0 before:left-0 before:size-full before:bg-[linear-gradient(180deg,rgba(13,12,12,0)_0%,rgba(13,12,12,.7)_34.48%,rgb(13,12,12)_82.36%)] md:w-[80rem]">
          <Image
            width={1920}
            height={1080}
            alt="App preview."
            src={'/echochat-preview.png'}
            className="bottom-0 left-0 right-0 top-0 rounded-xl"
          />
        </div>
      </div>
    </Column>
  );
};
