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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const Languages = [
  { value: "bn", label: "Bengali (বাংলা)" },
  { value: "ht", label: "Creole (kreyòl)" },
  { value: "en", label: "English" },
  { value: "fil", label: "Filipino" },
  { value: "fr", label: "French (français)" },
  { value: "rw", label: "Kinyarwanda" },
  { value: "pt", label: "Portuguese (Português)" },
  { value: "sn", label: "Shona" },
  { value: "so", label: "Somali (Soomaaliga)" },
  { value: "es", label: "Spanish (Español)" },
];

const Countries = [
  { value: "🇧🇩 Bangladesh", label: "🇧🇩 Bangladesh" },
  { value: "🇨🇺 Cuba", label: "🇨🇺 Cuba" },
  { value: "🇲🇼 Malawi", label: "🇲🇼 Malawi" },
  { value: "🇲🇿 Mozambique", label: "🇲🇿 Mozambique" },
  { value: "🇸🇩 Sudan", label: "🇸🇩 Sudan" },
  { value: "🇿🇼 Zimbabwe", label: "🇿🇼 Zimbabwe" },
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
              <NavigationMenuItem>
                <NavigationMenuLink href="#">
                  Aggregation Centres
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Buyers</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Deposits</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Exchanges</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Agro-Advisory</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Settings</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="🇧🇩 Bangladesh">
            <SelectTrigger aria-label="Country">
              <SelectValue placeholder="🇧🇩 Bangladesh" />
            </SelectTrigger>
            <SelectContent>
              {Countries.map((country) => (
                <SelectItem
                  key={country.value}
                  value={country.value}
                  className="whitespace-nowrap"
                >
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="en">
            <SelectTrigger aria-label="Language">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              {Languages.map((language) => (
                <SelectItem
                  key={language.value}
                  value={language.value}
                  className="whitespace-nowrap"
                >
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
