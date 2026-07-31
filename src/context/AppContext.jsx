import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [completedActivities, setCompletedActivities] = useState([]);

  const markActivityCompleted = (activityId, resultData = {}) => {
    if (!activityId) return;
    setCompletedActivities((prev) => {
      const exists = prev.find((item) => item.id === activityId);
      if (exists) {
        return prev.map((item) =>
          item.id === activityId ? { ...item, ...resultData, completedAt: new Date().toISOString() } : item
        );
      }
      return [...prev, { id: activityId, ...resultData, completedAt: new Date().toISOString() }];
    });
  };

  return (
    <AppContext.Provider
      value={{
        selectedSubject,
        setSelectedSubject,
        selectedGrade,
        setSelectedGrade,
        selectedActivity,
        setSelectedActivity,
        completedActivities,
        markActivityCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}