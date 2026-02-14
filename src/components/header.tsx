"use client";

import {
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  Settings,
  UserCircle,
} from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ResourceMenuItems = [
  { name: "Team members", href: "#" },
  { name: "Budget", href: "#" },
  { name: "Tools & equipment", href: "#" },
];

const GAP = 16; // gap-4 between logo, nav, and between left/right sections

function ProjectsHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navFits, setNavFits] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    function checkNavFits() {
      const header = headerRef.current;
      const actions = actionsRef.current;
      const logo = logoRef.current;
      const nav = navRef.current;
      if (!header || !actions || !logo || !nav) return;

      const availableWidth =
        header.clientWidth - actions.clientWidth - GAP;
      const requiredWidth =
        logo.offsetWidth + GAP + nav.scrollWidth;
      setNavFits(availableWidth >= requiredWidth);
    }

    checkNavFits();

    const observer = new ResizeObserver(() => {
      checkNavFits();
    });
    if (headerRef.current) observer.observe(headerRef.current);
    if (navRef.current) observer.observe(navRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 h-14 bg-background px-4 shadow-md">
      <div
        ref={headerRef}
        className="mx-auto flex h-full min-w-0 items-center justify-between gap-4"
      >
        <div className="flex min-w-0 flex-1 gap-4">
          <a
            ref={logoRef}
            href="/examples/demo-app"
            className="flex shrink-0 items-center gap-2"
          >
            <img src="/public/logos/regular/wfp-emblem.svg" alt="WFP Logo" className="size-9" />
            <span
              className={cn(
                "font-bold text-base text-wfp-blue",
                navFits ? "block" : "hidden"
              )}
            >
              Demo App
            </span>
          </a>
          <div
            ref={navRef}
            className={cn(
              "shrink-0",
              !navFits && "absolute left-0 top-0 invisible pointer-events-none"
            )}
            aria-hidden={!navFits}
          >
            <NavigationMenu className="flex" viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/examples/demo-app">
                    Projects
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/examples/demo-app">
                    Reports
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-48">
                      {ResourceMenuItems.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink href={item.href}>
                            {item.name}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {!navFits && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu />
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2">
                <a
                  href="/examples/demo-app"
                  className="rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Project
                </a>
                <a
                  href="/examples/demo-app"
                  className="rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reports
                </a>
                <div className="px-4 py-2">
                  <div className="mb-2 font-medium text-sm">Resource</div>
                  <div className="flex flex-col gap-2 pl-4">
                    {ResourceMenuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="py-2 text-muted-foreground text-sm transition-colors hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
            </Sheet>
          )}
        </div>
        <div ref={actionsRef} className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Help">
                  <HelpCircle />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Help</TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Notifications"
                    >
                      <Bell />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
              <DropdownMenuContent>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="font-medium">
                    Project deadline approaching
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Website Redesign is due in 2 days
                  </div>
                  <div className="text-muted-foreground text-xs">
                    5 minutes ago
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="font-medium">New task assigned</div>
                  <div className="text-muted-foreground text-xs">
                    You have been assigned to Database Migration
                  </div>
                  <div className="text-muted-foreground text-xs">
                    1 hour ago
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="font-medium">Project completed</div>
                  <div className="text-muted-foreground text-xs">
                    Payment Gateway Setup has been completed
                  </div>
                  <div className="text-muted-foreground text-xs">
                    3 hours ago
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-center text-primary text-sm">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/36326203"
                    alt="@ggkapanadze"
                  />
                  <AvatarFallback>GK</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="font-semibold text-sm">John Doe</p>
                  <p className="truncate text-muted-foreground text-xs">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export { ProjectsHeader };
