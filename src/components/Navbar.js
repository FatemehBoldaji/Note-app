import { alpha, AppBar, InputBase, Toolbar, styled, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddNote from "./AddNote";
import { useContext, useState } from "react";
import { NotesContext } from "./NotesContext";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.10),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    maxWidth: '100%',
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    pointerEvents: 'none',
    padding: theme.spacing(0, 2),
    color: theme.palette.grey[500]
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}))


export const Navbar = () => {

    const {setSearchNote} = useContext(NotesContext)
    return (
        <AppBar color="light" sx={{ marginBottom: 0, backgroundColor: '#ffffff' }}>
            <Toolbar sx={{
                position: 'static',
                maxWidth: "1200px",
                width: "100%",
                mx: "auto",
            }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e)=>setSearchNote(e.target.value)}
                    />
                </Search>
                <AddNote />
            </Toolbar>
        </AppBar>
    );
}