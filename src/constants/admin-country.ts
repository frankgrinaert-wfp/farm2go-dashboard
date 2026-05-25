export type AdminCountryOption = {
  value: string;
  label: string;
  /** Country name without flag, for “in {name}” copy. */
  name: string;
};

export const ADMIN_COUNTRIES: AdminCountryOption[] = [
  { value: "🇧🇩 Bangladesh", label: "🇧🇩 Bangladesh", name: "Bangladesh" },
  { value: "🇨🇺 Cuba", label: "🇨🇺 Cuba", name: "Cuba" },
  { value: "🇲🇼 Malawi", label: "🇲🇼 Malawi", name: "Malawi" },
  { value: "🇲🇿 Mozambique", label: "🇲🇿 Mozambique", name: "Mozambique" },
  { value: "🇸🇩 Sudan", label: "🇸🇩 Sudan", name: "Sudan" },
  { value: "🇿🇼 Zimbabwe", label: "🇿🇼 Zimbabwe", name: "Zimbabwe" },
];

export const DEFAULT_ADMIN_COUNTRY = ADMIN_COUNTRIES[0];

export function getAdminCountryByValue(
  value: string,
): AdminCountryOption {
  return (
    ADMIN_COUNTRIES.find((country) => country.value === value) ??
    DEFAULT_ADMIN_COUNTRY
  );
}
