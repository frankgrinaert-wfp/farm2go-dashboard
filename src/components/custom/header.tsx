"use client";

import {
  HelpCircle,
  LogOut,
  Menu,
  Info,
  UserCircle,
  ScrollText,
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
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
                  href="#"
                  className="rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Project
                </a>
                <a
                  href="#"
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

          <a href="#" className="flex items-center gap-2">
            <img
              src="/public/logos/farm2go.svg"
              alt="WFP Logo"
              className="size-6"
            />
            <span className="font-bold text-base text-wfp-blue">Farm2Go</span>
          </a>
          <NavigationMenu className="hidden md:flex" viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Overview</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Farmers</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Help">
                <HelpCircle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Help</TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src="https://ca.slack-edge.com/T0252LMSB-UFQQQB50V-5a561a7581d9-192"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
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
                  <p className="truncate text-muted-foreground text-xs">
                    Manager
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Info />
                App information
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://cdn.wfp.org/legal/terms/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ScrollText />
                  Terms and conditions
                </a>
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
