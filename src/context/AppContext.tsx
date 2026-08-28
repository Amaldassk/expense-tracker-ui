import { createContext, useContext, useState, type ReactElement } from "react";

type AppContextType = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactElement }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [selectedMonth, setSelectedMonth] = useState("August");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        selectedMonth,
        setSelectedMonth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}
