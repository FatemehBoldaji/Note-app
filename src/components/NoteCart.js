import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Checkbox, Chip, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';
import { NotesContext } from './NotesContext';
import CategoriesItems from './CategoriesItems';


export const NoteCart = ({ noteCard }) => {

    const categoryBackgroundColors = {
        Home: '#a5d6a7',
        Business: '#b39ddb',
        Personal: '#ffcc80'
    };
    const categoryColors = {
        Home: '#1b5e20',
        Business: '#4a148c',
        Personal: '#e65100'
    }

    const { dispatch } = React.useContext(NotesContext)
    const [isEdit, setIsEdit] = React.useState(false)
    const [formData, setFormData] = React.useState({
        title: noteCard.title,
        category: noteCard.category,
        description: noteCard.description,
        isCompeleted: noteCard.isCompeleted
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = (e) => {
        dispatch({ type: "EDIT_NOTE", payload: { id: noteCard.id, updates: { ...formData } } })
        setIsEdit(!isEdit)
    }
    const card = (
        <React.Fragment >
            <CardContent sx={{ minHeight: '200px' }}>
                <CardActions sx={{ display: "flex", justifyContent: 'space-between', gap: 2, padding: 0 }}>
                    {isEdit ? (
                        <CategoriesItems value={formData.category} onChange={(newValue) => setFormData(prev => ({ ...prev, category: newValue }))} />
                    ) :
                        <Chip sx={{ backgroundColor: categoryBackgroundColors[noteCard.category], color: categoryColors[noteCard.category] }}label={noteCard.category} />
                    }

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Checkbox size='small' checked={noteCard.isCompeleted} onChange={() => dispatch({ type: "EDIT_NOTE", payload: { id: noteCard.id, updates: { isCompeleted: !noteCard.isCompeleted } } })} />
                        {isEdit ?
                            (
                                <>
                                    <IconButton onClick={() => setIsEdit(!isEdit)}>
                                        <CloseIcon fontSize='small' />
                                    </IconButton>
                                    <IconButton onClick={() => handleEdit()}>
                                        <CheckIcon fontSize='small' />
                                    </IconButton>
                                </>
                            ) :
                            <IconButton onClick={() => setIsEdit(!isEdit)}>
                                <EditIcon fontSize='small' sx={{ color: grey[600] }} />
                            </IconButton>
                        }

                        <IconButton onClick={() => dispatch({ type: "DELETE_NOTE", payload: noteCard.id })}>
                            <DeleteIcon fontSize='small' sx={{ color: grey[600] }} />
                        </IconButton>
                    </Box>
                </CardActions>
                <Typography variant="h5" component="div" sx={{ padding: "10px 0" }}>
                    {isEdit ?
                        <TextField id="note-title" label="Title" variant="outlined" size='small'
                            sx={{ margin: '10px 0', width: '96%' }}
                            name='title'
                            defaultValue={noteCard.title}
                            onChange={handleChange}
                        /> :
                        noteCard.title
                    }

                </Typography>
                <Typography variant="body2" sx={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    {isEdit ?
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={2}
                            size='small'
                            sx={{ width: '96%' }}
                            name='description'
                            defaultValue={noteCard.description}
                            onChange={handleChange}
                        /> :
                        noteCard.description
                    }
                </Typography>
            </CardContent>

        </React.Fragment>
    );


    return (
        <Box>
            <Card variant='outline' sx={{ borderRadius: '8px', border: '1px solid rgba(145, 141, 141, 0.2)' }}>{card}</Card>
        </Box>
    );
}