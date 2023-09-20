
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function NoteModal({
  isOpen,
  handleClose,
  title,
  description,
  handleSave,
  handleDelete,
  mode,
}) {
  const [noteTitle, setNoteTitle] = useState(title || '');
  const [noteDescription, setNoteDescription] = useState(description || '');

  const handleSaveNote = () => {
    handleSave(noteTitle, noteDescription);
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
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
        <h2 id="modal-title">
          {mode === 'create' ? 'Create Note' : `Edit Note`}
        </h2>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={noteDescription}
          onChange={(e) => setNoteDescription(e.target.value)}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          {mode === 'edit' && (
            <IconButton aria-label="delete">
              <DeleteIcon sx={{ color: 'red' }} onClick={handleDelete} />
            </IconButton>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveNote}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
