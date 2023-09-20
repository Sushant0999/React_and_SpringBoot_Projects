import React, { useEffect, useState } from 'react';
import NoteData from './NoteData';
import { Grid, Paper, Typography, Modal, Box, Fab, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { getById } from './EditNote';
import DeleteNote from './DeleteNote';

export default function Note() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [noteData, setNoteData] = useState(null);


    const colorList = [
        "#F28B82",
        "#FBBC04",
        "#FFF475",
        "#CCFF90",
        "#A7FFEB",
        "#CBF0F8",
        "#AECBFA",
        "#D7AEFB",
        "#FDCFE8",
        "#E6C9A8",
        "#E8EAED",
    ];

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorList.length);
        return colorList[randomIndex];
    }

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


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <NoteData setData={setData} />

            {data.length !== 0 ? (
                <div style={{ marginTop: '80px', position: 'relative', width: '100%', height: '100%' }}>
                    <Grid container spacing={2} style={{ width: '100%', height: '100%' }}>
                        {data.map((item) => {
                            const randomColor = getRandomColor();
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={item.noteId}>
                                    <Box sx={{ height: 'auto', width: 'auto' }} key={item.id} onClick={() => { console.log("item.noteId ", item.noteId); handleClick(item.noteId) }}>
                                        <Paper elevation={3} style={{ padding: '20px', backgroundColor: randomColor }} className="note">
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

            <Modal
                open={isModalOpen}
                onClose={handleCloseModel}
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
                        {selectedNoteId !== null
                            ? `Note Id: ${selectedNoteId}`
                            : 'Create Note'}
                    </h2>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="title"
                        value={noteData?.title || ''}
                        variant="standard"
                        onChange={(e) => {
                            const updatedTitle = e.target.value;
                            setNoteData((prevData) => ({
                                ...prevData,
                                title: updatedTitle,
                            }));
                        }}
                    />
                    <p id="modal-description">Description</p>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="description"
                        variant="outlined"
                        value={noteData?.description || ''}
                        onChange={(e) => {
                            const updatedDescription = e.target.value;
                            setNoteData((prevData) => ({
                                ...prevData,
                                description: updatedDescription,
                            }));
                        }}
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
                            <DeleteIcon sx={{ color: 'red' }} onClick={<DeleteNote />} />
                        </IconButton>
                        <Button variant="contained" color="success">
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
