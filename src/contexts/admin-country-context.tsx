import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_ADMIN_COUNTRY,
  getAdminCountryByValue,
  type AdminCountryOption,
} from "@/constants/admin-country";

type AdminCountryContextValue = {
  country: AdminCountryOption;
  setCountryValue: (value: string) => void;
};

const AdminCountryContext = createContext<AdminCountryContextValue | null>(
  null,
);

function AdminCountryProvider({ children }: { children: ReactNode }) {
  const [countryValue, setCountryValue] = useState(DEFAULT_ADMIN_COUNTRY.value);

  const country = useMemo(
    () => getAdminCountryByValue(countryValue),
    [countryValue],
  );

  const setCountry = useCallback((value: string) => {
    setCountryValue(value);
  }, []);

  const value = useMemo(
    () => ({ country, setCountryValue: setCountry }),
    [country, setCountry],
  );

  return (
    <AdminCountryContext.Provider value={value}>
      {children}
    </AdminCountryContext.Provider>
  );
}

function useAdminCountry(): AdminCountryContextValue {
  const context = useContext(AdminCountryContext);
  if (context === null) {
    throw new Error("useAdminCountry must be used within AdminCountryProvider");
  }
  return context;
}

export { AdminCountryProvider, useAdminCountry };
