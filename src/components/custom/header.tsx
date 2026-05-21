"use client";

import { LogOut, Menu, Info, UserCircle, ScrollText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getRoleCategory } from "@/config/role-categories";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AppInformationDialog } from "@/components/custom/app-information-dialog";
import {
  EditProfileSheet,
  type CountryOption,
} from "@/components/custom/edit-profile-sheet";
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

const Countries: CountryOption[] = [
  { value: "🇧🇩 Bangladesh", label: "🇧🇩 Bangladesh" },
  { value: "🇨🇺 Cuba", label: "🇨🇺 Cuba" },
  { value: "🇲🇼 Malawi", label: "🇲🇼 Malawi" },
  { value: "🇲🇿 Mozambique", label: "🇲🇿 Mozambique" },
  { value: "🇸🇩 Sudan", label: "🇸🇩 Sudan" },
  { value: "🇿🇼 Zimbabwe", label: "🇿🇼 Zimbabwe" },
];

function ProjectsHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [appInformationDialogOpen, setAppInformationDialogOpen] =
    useState(false);

  return (
    <header className="sticky top-0 z-50 h-14 bg-background px-4 shadow-md">
      <div className="mx-auto flex h-full items-center justify-between">
        <div className="flex gap-3">
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

          <Link to="/" className="flex items-center gap-1.5">
            <img
              src={`${import.meta.env.BASE_URL}logos/farm2go.svg`}
              alt="WFP Logo"
              className="size-6"
            />
            <p className="font-bold text-base text-wfp-blue">Farm2Go</p>
            <p className="text-base text-muted-foreground">Dashboard</p>
          </Link>
          <NavigationMenu className="hidden md:flex" viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/">Overview</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to={getRoleCategory("farmer").listPath ?? "/farmers"}>
                    {getRoleCategory("farmer").label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to={
                      getRoleCategory("aggregator").listPath ?? "/aggregators"
                    }
                  >
                    {getRoleCategory("aggregator").label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to={getRoleCategory("buyer").listPath ?? "/buyers"}>
                    {getRoleCategory("buyer").label}
                  </Link>
                </NavigationMenuLink>
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
        <div className="flex items-center gap-3">
          <Select defaultValue="🇧🇩 Bangladesh">
            <SelectTrigger aria-label="Country" className="border-border">
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
            <SelectTrigger aria-label="Language" className="border-border">
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
                    john.doe@wfp.com
                  </p>
                  <p className="truncate text-muted-foreground text-xs">
                    Manager
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setProfileSheetOpen(true)}>
                <UserCircle />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setAppInformationDialogOpen(true)}
              >
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
          <EditProfileSheet
            open={profileSheetOpen}
            onOpenChange={setProfileSheetOpen}
            countries={Countries}
          />
          <AppInformationDialog
            open={appInformationDialogOpen}
            onOpenChange={setAppInformationDialogOpen}
          />
        </div>
      </div>
    </header>
  );
}

export { ProjectsHeader };
