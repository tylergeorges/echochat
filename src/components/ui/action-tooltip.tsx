import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface ActionTooltipProps {
  children: React.ReactNode;
  label: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

export const ActionTooltip = ({
  children,
  label,
  side = 'top',
  align = 'center'
}: ActionTooltipProps) => {
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipPortal>
          <TooltipContent side={side} align={align}>
            <p className="text-sm font-semibold capitalize">{label}</p>

            <TooltipArrow className="fill-popover" />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
};
