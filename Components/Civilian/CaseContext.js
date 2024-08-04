// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CasesContext = createContext();

// export const CasesProvider = ({ children }) => {
//     const [cases, setCases] = useState([]);

//     // Load cases from AsyncStorage
//     const loadCases = async () => {
//         try {
//             const savedCases = await AsyncStorage.getItem('@cases');
//             if (savedCases !== null) {
//                 setCases(JSON.parse(savedCases));
//             }
//         } catch (error) {
//             console.error('Error loading cases data:', error.message);
//         }
//     };

//     // Save cases to AsyncStorage
//     const saveCases = async (cases) => {
//         try {
//             await AsyncStorage.setItem('@cases', JSON.stringify(cases));
//         } catch (error) {
//             console.error('Error saving cases data:', error.message);
//         }
//     };

//     useEffect(() => {
//         loadCases();
//     }, []);

//     useEffect(() => {
//         saveCases(cases);
//     }, [cases]);

//     const addCase = (newCase) => {
//         setCases(prevCases => [...prevCases, newCase]);
//     };

//     return (
//         <CasesContext.Provider value={{ cases, addCase }}>
//             {children}
//         </CasesContext.Provider>
//     );
// };

// export const useCases = () => {
//     return useContext(CasesContext);
// };



import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CasesContext = createContext();

export const CasesProvider = ({ children }) => {
    const [cases, setCases] = useState([]);
    const [lawyerCases, setLawyerCases] = useState([]);

    // Load cases from AsyncStorage
    const loadCases = async () => {
        try {
            const savedCases = await AsyncStorage.getItem('@cases');
            if (savedCases !== null) {
                setCases(JSON.parse(savedCases));
            }
        } catch (error) {
            console.error('Error loading cases data:', error.message);
        }
    };

    // Save cases to AsyncStorage
    const saveCases = async (cases) => {
        try {
            await AsyncStorage.setItem('@cases', JSON.stringify(cases));
        } catch (error) {
            console.error('Error saving cases data:', error.message);
        }
    };

    // Load lawyer cases from AsyncStorage
    const loadLawyerCases = async () => {
        try {
            const savedLawyerCases = await AsyncStorage.getItem('@lawyerCases');
            if (savedLawyerCases !== null) {
                setLawyerCases(JSON.parse(savedLawyerCases));
            }
        } catch (error) {
            console.error('Error loading lawyer cases data:', error.message);
        }
    };

    // Save lawyer cases to AsyncStorage
    const saveLawyerCases = async (lawyerCases) => {
        try {
            await AsyncStorage.setItem('@lawyerCases', JSON.stringify(lawyerCases));
        } catch (error) {
            console.error('Error saving lawyer cases data:', error.message);
        }
    };

    useEffect(() => {
        loadCases();
        loadLawyerCases();
    }, []);

    useEffect(() => {
        saveCases(cases);
    }, [cases]);

    useEffect(() => {
        saveLawyerCases(lawyerCases);
    }, [lawyerCases]);

    const addCase = (newCase) => {
        setCases(prevCases => [...prevCases, newCase]);
    };

    const addLawyerCase = (caseId) => {
        setLawyerCases(prevLawyerCases => [...prevLawyerCases, caseId]);
    };

    return (
        <CasesContext.Provider value={{ cases, addCase, lawyerCases, addLawyerCase, setCases }}>
            {children}
        </CasesContext.Provider>
    );
};

export const useCases = () => {
    return useContext(CasesContext);
};
