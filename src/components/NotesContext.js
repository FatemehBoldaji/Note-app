import { createContext, useEffect, useReducer, useState } from "react";

const initialState = () => {
    const data = localStorage.getItem("note-list");
    return data ? JSON.parse(data) : [];

}

const noteReducer = (state, action) => {
    switch (action.type) {
        case "ADD_NOTE":
            return [...state, action.payload];
        case "DELETE_NOTE":
            return state.filter(note => note.id !== action.payload);
        case "EDIT_NOTE":
            return state.map(note=>
                action.payload.id === note.id ?
                {...note, ...action.payload.updates}:
                note
            )
        default:
            return state;
    }
};

export const NotesContext = createContext();

export const NotesProvider = ({children}) => {
    const [notes, dispatch] = useReducer(noteReducer, [], initialState);
    useEffect(() => {
        localStorage.setItem("note-list", JSON.stringify(notes))
    }, [notes])
    const [searchNote, setSearchNote] = useState("");
    

    return <NotesContext.Provider value={{notes, dispatch, searchNote, setSearchNote}}>{children}</NotesContext.Provider>
}
