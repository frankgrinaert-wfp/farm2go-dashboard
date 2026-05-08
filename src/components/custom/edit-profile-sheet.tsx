"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type CountryOption = {
  value: string;
  label: string;
};

type EditProfileSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countries: CountryOption[];
};

function EditProfileSheet({
  open,
  onOpenChange,
  countries,
}: EditProfileSheetProps) {
  const countriesAnchor = useComboboxAnchor();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 p-4">
          <Avatar className="size-20">
            <AvatarImage
              src="https://ca.slack-edge.com/T0252LMSB-UFQQQB50V-5a561a7581d9-192"
              alt="Profile avatar"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <div className="grid gap-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              defaultValue="john.doe@wfp.org"
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile-first-name">First name</Label>
            <Input id="profile-first-name" defaultValue="John" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile-last-name">Last name</Label>
            <Input id="profile-last-name" defaultValue="Doe" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile-country">Countries</Label>
            <Combobox multiple items={countries} defaultValue={[countries[0]]}>
              <ComboboxChips ref={countriesAnchor}>
                <ComboboxValue>
                  {(selectedCountries: CountryOption[] = []) =>
                    selectedCountries.map((country) => (
                      <ComboboxChip key={country.value}>
                        {country.label}
                      </ComboboxChip>
                    ))
                  }
                </ComboboxValue>
                <ComboboxChipsInput
                  id="profile-country"
                  placeholder="Select"
                  aria-label="Countries"
                />
                <ComboboxTrigger className="ml-auto" />
              </ComboboxChips>
              <ComboboxContent anchor={countriesAnchor}>
                <ComboboxList>
                  <ComboboxEmpty>No countries found.</ComboboxEmpty>
                  {countries.map((country) => (
                    <ComboboxItem
                      key={country.value}
                      value={country}
                      className="whitespace-nowrap"
                    >
                      {country.label}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
        <SheetFooter className="flex-row justify-end gap-2">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export type { CountryOption };
export { EditProfileSheet };
