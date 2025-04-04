'use client';

import * as React from 'react';

import {cn} from '@/lib/utils';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import {signIn, signOut, useSession} from 'next-auth/react';
import {Button} from './ui/button';
import {usePathname} from 'next/navigation';

const components: {title: string; href: string; description: string}[] = [
	{
		title: 'Protected Route',
		href: '/protected',
		description:
			'Protects a route and redirects to sign in if not authenticated.',
	},
	{
		title: 'Server Action',
		href: '/serverAction',
		description:
			'Server Action is a function that runs on the server and can be called from the client.',
	},
	{
		title: 'API from Client',
		href: '/apiFromClient',
		description:
			'API from Client is a function that runs on the client and can be called from the server.',
	},
	{
		title: 'API from Server',
		href: '/apiFromServer',
		description:
			'API from Server is a function that runs on the server and can be called from the client.',
	},
];

function AuthButton() {
	'use client';
	const {data: session} = useSession();

	if (session) {
		return (
			<>
				<Button onClick={() => signOut()}>Sign out</Button>
			</>
		);
	}
	return (
		<>
			<Button onClick={() => signIn()}>Sign in</Button>
		</>
	);
}

export function Nav() {
	const pathname = usePathname();
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink
						href="/"
						className={navigationMenuTriggerStyle()}
					>
						Home
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Pages</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
									className={
										pathname === component.href
											? 'bg-accent'
											: ''
									}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<AuthButton />
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({className, title, children, ...props}, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">
						{title}
					</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';
