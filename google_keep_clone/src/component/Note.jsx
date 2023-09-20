import React, { useEffect, useState } from 'react';
import NoteData from './NoteData';
import { Grid, Paper, Typography, Modal, Box, Fab, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { getById } from './EditNote';
import DeleteNote from './DeleteNote';
import { getRandomColor } from '../utils/ColorList'
import NoteModal from './NoteModel';

export default function Note() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteData, setNoteData] = useState(null);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [modalMode, setModalMode] = useState('create');

    const handleCreateNote = () => {
        setModalMode('create');
        setSelectedNoteId(null);
        setNoteData({ title: '', description: '' });
        setIsModalOpen(true);
    };

    const handleEditNote = (note) => {
        setModalMode('edit');
        setSelectedNoteId(note.noteId);
        setNoteData({ title: note.title, description: note.description });
        setIsModalOpen(true);
    };

    const handleDeleteNote = () => {
        // Implement your delete note logic here
        // You can use the selectedNoteId to identify the note to delete
    };

    const handleSaveNote = (title, description) => {
        if (modalMode === 'create') {
            // Implement your create note logic here
        } else if (modalMode === 'edit') {
            // Implement your edit note logic here
        }
        setIsModalOpen(false);
    };


    useEffect(() => {
        if (selectedNoteId !== null) {
            getById(selectedNoteId)
                .then((data) => {
                    setNoteData(data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selectedNoteId]);

    const handleCloseModel = () => {
        setIsModalOpen(false);
    }

    const handleClick = (itemId) => {
        setSelectedNoteId(itemId);
        setIsModalOpen(true);
    }

    const handleDelete = () => {
        <DeleteNote />
    }


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <NoteData setData={setData} />

            {data.length !== 0 ? (
                <div style={{ marginTop: '80px', position: 'relative', width: '100%', height: '100%' }}>
                    <Grid container spacing={2} style={{ width: '100%', height: '100%' }}>
                        {data.map((item) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={item.noteId}>
                                    <Box sx={{ height: 'auto', width: 'auto' }} key={item.id} onClick={() => { console.log("item.noteId ", item.noteId); handleClick(item.noteId) }}>
                                        <Paper elevation={3} style={{ padding: '20px', backgroundColor: `${item.color}` }} className="note">
                                            <Typography variant="body1">{item.userId}</Typography>
                                            <Typography variant="body1">{item.noteId}</Typography>
                                            <Typography variant="h5">{item.title}</Typography>
                                            <Typography variant="h5">{item.completed}</Typography>
                                        </Paper>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>

                    <Box sx={{ position: 'fixed', bottom: '20px', right: '20px' }} >
                        <Fab color="primary" aria-label="add" >
                            <AddIcon />
                        </Fab>
                    </Box>
                </div>
            ) : (
                <div style={{ marginTop: '80px', textAlign: 'center' }}>
                    <h1>No data available</h1>
                    <Box sx={{ position: 'fixed', bottom: '20px', right: '20px' }} >
                        <Fab color="primary" aria-label="add" >
                            <AddIcon />
                        </Fab>
                    </Box>
                </div>
            )}

            <NoteModal
                isOpen={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                title={noteData?.title}
                description={noteData?.description}
                handleSave={handleSaveNote}
                handleDelete={handleDeleteNote}
                mode={modalMode}
            />
        </div>
    );
}
