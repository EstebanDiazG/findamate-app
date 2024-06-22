import React, { createContext, useContext, useState, ReactNode } from "react";
import { ITopic } from "@/interfaces/topic";

interface RecentTopicsContextProps {
  recentTopics: ITopic[];
  setRecentTopics: React.Dispatch<React.SetStateAction<ITopic[]>>;
}

const RecentTopicsContext = createContext<RecentTopicsContextProps>({
  recentTopics: [],
  setRecentTopics: () => {},
});

export const useRecentTopics = () => useContext(RecentTopicsContext);

export const RecentTopicsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recentTopics, setRecentTopics] = useState<ITopic[]>([]);

  return (
    <RecentTopicsContext.Provider value={{ recentTopics, setRecentTopics }}>
      {children}
    </RecentTopicsContext.Provider>
  );
};
