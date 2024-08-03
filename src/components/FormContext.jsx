import React, { createContext, useState, useEffect } from 'react';
import { onGetForms } from '../credential'; // Importa la función que obtiene los formularios

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const unsubscribe = onGetForms((querySnapshot) => {
            const formsArray = [];
            querySnapshot.forEach(doc => {
                formsArray.push({ ...doc.data(), id: doc.id });
            });
            setForms(formsArray);
        });

        return () => unsubscribe();
    }, []);

    return (
        <FormContext.Provider value={{ forms }}>
            {children}
        </FormContext.Provider>
    );
};
