'use client';

import Image from 'next/image';

import { useSignIn } from '@/hooks/use-sign-in';

import { cn } from '@/lib/utils';

import { Column, Row } from '@/components/flex';
import { Icons } from '@/components/icons';
import { LoginButton } from '@/components/login-button';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { Button, ButtonLink } from '@/components/ui/button';

const HeroBadgeButton = () => {
  const [signIn] = useSignIn();

  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(
        'focus-visible:riz-10 group relative z-10 w-fit translate-y-[-1rem] animate-fade-in cursor-pointer overflow-hidden rounded-full pr-2 text-xs font-semibold opacity-0 outline-none horizontal center [--animation-delay:200ms]',
        ' '
      )}
      onClick={() => {
        signIn();
      }}
    >
      <div className="relative w-full gap-1 transition-transform delay-75 duration-300 horizontal center group-hover:-translate-y-7">
        Jump Into the Fun
        <Icons.ChevronRight className="size-3" />
      </div>

      <div className="absolute w-full translate-y-7 gap-1 transition-transform delay-75 duration-300 horizontal center-v center group-hover:translate-y-0">
        Jump Into the Fun
        <Icons.ChevronRight className="size-3" />
      </div>
    </Button>
  );
};

export const Hero = () => {
  return (
    <Column className="size-full flex-1 text-center">
      <div className="size-full flex-1 p-[calc(116*1px)_0_calc(128*1px)]">
        <div className="grid size-full grid-cols-1 items-center gap-8 px-[max(5vw,(100vw_-_1160px)/2)] md:grid-cols-[repeat(2,1fr)]">
          <div className="size-full items-start justify-end text-left vertical md:ml-auto md:justify-center lg:pl-[5rem]">
            <HeroBadgeButton />

            <div className="relative mx-0 translate-y-[-1rem] animate-fade-in text-balance to-foreground pt-5 text-left text-5xl font-bold leading-[1.1] tracking-tighter text-white opacity-0 [--animation-delay:400ms] md:py-2 md:text-7xl">
              Make your <br />
              words&nbsp;
              <SparklesText className="text-indigo-400">echo</SparklesText>
            </div>

            <p className="max-w-[30ch] translate-y-[-1rem] animate-fade-in text-base font-medium text-foreground/50 opacity-0 [--animation-delay:800ms] md:max-w-[40ch] md:text-lg">
              Echo your words and create ripples that engage your entire community.
            </p>

            <Row className="mt-6 gap-4 text-foreground lg:mt-8">
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
          </div>

          <Column className="relative size-full max-h-[25dvh]">
            <div className="left-12 w-[60rem] animate-fade-to-left opacity-0 vertical [--animation-delay:400ms] after:absolute after:bottom-0 after:left-0 after:size-full after:bg-[linear-gradient(180deg,rgba(13,12,12,0)_0%,rgba(13,12,12,.7)_34.48%,rgb(13,12,12)_82.36%)] md:w-[80rem] lg:ml-32 xl:w-[100rem]">
              <Image
                width={1920}
                height={1080}
                alt="App preview."
                src={'/echochat-preview.png'}
                className="size-full rounded-xl"
              />
            </div>
          </Column>
        </div>
      </div>
    </Column>
  );
};
