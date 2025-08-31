import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel } from '@mui/material';
import { NoteCart } from './NoteCart';
import { NotesContext } from './NotesContext';


export const CategoryTabs = () => {
  const [value, setValue] = React.useState(0);
  const { notes, searchNote } = React.useContext(NotesContext)
  const [showNotes, setShowNotes] = React.useState(false)
  const filteredNote = notes.filter(note => {

    if (value === 1 && !note.category.includes("Personal")) return false;
    if (value === 2 && !note.category.includes("Home")) return false;
    if (value === 3 && !note.category.includes("Business")) return false;
    if (searchNote && !note.title.toLowerCase().includes(searchNote.toLowerCase())) return false;
    if (showNotes && !note.isCompeleted) return false;
    return true;

  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ margin: "0px 215px"}}>
      <Box sx={{
        position: 'sticky',
        top: 65,
        backgroundColor: "#eeeeee",
        zIndex: 10,
        pb: 2
      }}>
        <Box sx={{ fontFamily: "sans-serif", fontWeight: "bold", marginBottom: "7px", marginTop: '65px', paddingTop: '35px' }}>Your notes</Box>
        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
          <Tabs sx={{ borderBottom: 1, borderColor: 'divider', }} value={value} onChange={handleChange}>
            <Tab label="ALL" />
            <Tab label="PERSONAL" />
            <Tab label="HOME" />
            <Tab label="BUSINESS" />
          </Tabs>
          <FormControlLabel sx={{ color: "#424242", margin: 0 }} control={<Checkbox size='small' />} label="Show only compeleted notes" onChange={() => setShowNotes(!showNotes)} />
        </Box>
      </Box>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 2,
      }}>
        {
          filteredNote.map((note) => (
            <NoteCart key={note.id} noteCard={note} />))
        }
      </Box>
    </Box>
  );
}