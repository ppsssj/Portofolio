/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LANGUAGE_STORAGE_KEY = "site_language";

const LanguageContext = createContext(null);

function detectInitialLanguage() {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "ko" || stored === "en") return stored;

  return navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectInitialLanguage);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === "ko" ? "en" : "ko")),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
