"use client";

import {
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  Settings,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
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

function ProjectsHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-14 bg-background px-4 shadow-md">
      <div className="mx-auto flex h-full items-center justify-between">
        <div className="flex gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
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

          <a href="/examples/demo-app" className="flex items-center gap-2">
            <img
              src="/public/logos/regular/wfp-emblem.svg"
              alt="WFP Logo"
              className="size-9"
            />
            <span className="font-bold text-base text-wfp-blue">Farm2Go</span>
          </a>
          <NavigationMenu className="hidden md:flex" viewport={false}>
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
        <div className="flex items-center gap-2">
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
