import React, { useState } from 'react';
import { Modal, Box, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { addData } from './EditNote';

export default function AddNoteModal({ isOpen, onClose, onNoteAdded }) {
    const [newNoteData, setNewNoteData] = useState({
        title: '',
        description: '',
        userId: 1,
    });

    const handleCreateNewNote = () => {
        const newNote = {
            title: newNoteData.title,
            description: newNoteData.description,
            userId: newNoteData.userId,
        };

        addData(newNote)
            .then((response) => {
                console.log('New note added:', response);
                onNoteAdded(response);
                onClose();
            })
            .catch((error) => {
                console.error('Error adding new note:', error);
            });
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    borderRadius: '12px',
                    padding: '16px 32px 24px 32px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: 16,
                }}
            >
                <h2 id="modal-title">Create New Note</h2>
                <TextField
                    fullWidth
                    id="new-title"
                    label="Title"
                    variant="standard"
                    value={newNoteData.title}
                    onChange={(e) => setNewNoteData({ ...newNoteData, title: e.target.value })}
                />
                <p id="modal-description">Description</p>
                <TextField
                    fullWidth
                    id="new-description"
                    label="Description"
                    variant="outlined"
                    value={newNoteData.description}
                    onChange={(e) => setNewNoteData({ ...newNoteData, description: e.target.value })}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                        marginBottom: '10px',
                    }}
                >
                    <IconButton aria-label="delete">
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                    <Button variant="contained" color="success" onClick={handleCreateNewNote}>
                        Create Note
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
