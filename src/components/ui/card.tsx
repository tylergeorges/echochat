"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ children, className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	),
);

Card.displayName = "Card";

export const CardHeader = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div ref={ref} {...props} className={cn("flex flex-col", className)}>
		{children}
	</div>
));

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
	<h2
		{...props}
		ref={ref}
		className={cn("text-center text-2xl font-bold tracking-tight", className)}
	>
		{children}
	</h2>
));

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
	<p
		{...props}
		ref={ref}
		className={cn("m-0 text-sm text-muted-foreground", className)}
	>
		{children}
	</p>
));

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div {...props} ref={ref} className={cn("", className)}>
		{children}
	</div>
));

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div
		{...props}
		ref={ref}
		className={cn("flex w-full flex-1 items-center px-6", className)}
	>
		{children}
	</div>
));

CardFooter.displayName = "CardFooter";
