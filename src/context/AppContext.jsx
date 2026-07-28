import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {

    const [selectedSubject, setSelectedSubject] = useState(null);

    const [selectedGrade, setSelectedGrade] = useState(null);

    const [selectedActivity, setSelectedActivity] = useState(null);

    return (

        <AppContext.Provider
            value={{
                selectedSubject,
                setSelectedSubject,

                selectedGrade,
                setSelectedGrade,

                selectedActivity,
                setSelectedActivity
            }}
        >

            {children}

        </AppContext.Provider>

    );

}

export function useApp() {

    return useContext(AppContext);

}