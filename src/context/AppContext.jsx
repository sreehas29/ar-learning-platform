import { createContext, useContext, useState } from "react";
import { stopSpeech } from "../services/audioService";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [completedActivities, setCompletedActivities] = useState([]);
  const [customActivities, setCustomActivities] = useState([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

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

  const addCustomActivity = (newActivity) => {
    if (!newActivity || !newActivity.title) return;
    setCustomActivities((prev) => [newActivity, ...prev]);
  };

  const resetSelection = () => {
    setSelectedSubject(null);
    setSelectedGrade(null);
    setSelectedActivity(null);
  };

  const toggleAudioMute = () => {
    setIsAudioMuted((prev) => {
      const next = !prev;
      if (next) stopSpeech();
      return next;
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
        customActivities,
        addCustomActivity,
        resetSelection,
        isAudioMuted,
        toggleAudioMute,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}