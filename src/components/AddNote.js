import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import CategoriesItems from './CategoriesItems';
import { useContext } from 'react';
import { NotesContext } from './NotesContext';


export default function AddNote() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { dispatch } = useContext(NotesContext)
    const [formData, setFormData] = React.useState({
        title: "",
        category: "",
        description: "...",
        isCompeleted: false
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleAdd = (e) => {
        e.preventDefault();
        if(formData.title === "" || formData.category === "")
            return
        dispatch({ type: "ADD_NOTE", payload: { id: Date.now(), ...formData } });
        setFormData({ title: "", category: "", description: "...", isCompeleted: false });
        handleClose();
    };


    return (
        <React.Fragment>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: "50px "}} onClick={handleClickOpen}>Add</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Note</DialogTitle>
                <DialogContent sx={{ width: '300px' }}>
                    <form onSubmit={handleAdd} id="note-form">
                        <TextField id="note-title" label="Title" variant="outlined"
                            sx={{ margin: '10px 0 35px  ', width: '100%' }}
                            name='title'
                            onChange={handleChange}
                        />
                        <CategoriesItems value={formData.category} onChange={(newValue)=>setFormData(prev=>({...prev, category: newValue}))} />
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            sx={{ width: '300px', marginTop: '35px' }}
                            name='description'
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="note-form" onClick={handleAdd}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
