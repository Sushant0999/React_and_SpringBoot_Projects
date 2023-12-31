import { Modal, Box, Paper, Typography, Grid, Dialog, Button, DialogActions, DialogContentText, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HashLoader } from 'react-spinners';
import { getDeletedNotes } from '../api/DeletedNotes';
import { deleteFromTrash } from '../api/RemoveFromTrash';
import { toast } from 'react-toastify';
import { restoredFromTrash } from '../api/RestoreFromTrash';
import { fetchAndRefreshData } from './Note';

export default function TrashModal(props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [noteDeleted, setNoteDeleted] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [noteId, setNoteId] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minHeight: '400px',
        width: '75%',
        borderRadius: '12px',
        backgroundColor: `${props.modalBg}`,
        boxShadow: 16,
        padding: '20px'
    };

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    }

    const onClose = () => {
        setModalOpen(false);
        fetchAndRefreshData();
    }

    const onOpen = () => {
        setModalOpen(true);
        setNoteDeleted(true);
    }

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteFromTrash(noteId);
            getList();
        } catch (error) {
            toast.warn('Server Error!', {
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
        setDialogOpen(false);

    }

    const handleRestore = async () => {
        try {
            setLoading(true);
            await restoredFromTrash(noteId);
            getList();
        } catch (error) {
            toast.warn('Server Error!', {
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
        setDialogOpen(false);
    }


    const getList = async () => {
        const noteList = await getDeletedNotes();
        setData(noteList);
        setNoteDeleted(false);
    }

    useEffect(() => {
        getList();
    }, [noteDeleted, noteId]);

    const handleClick = (noteId) => {
        setNoteId(noteId);
        handleClickOpen();
    }

    return (
        <div>
            <Tooltip title={'Trash'}>
                <FontAwesomeIcon icon={faTrash} size='2x' onClick={onOpen} />
                <Modal open={isModalOpen} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box style={style}>
                        <h1 style={{ textAlign: 'center' }}>Trash</h1>
                        {data ? (
                            <>
                                {isLoading === true ? <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '20px'
                                }}>
                                    <HashLoader color='#f6ed22' size={100} />
                                </Box> : <Grid container>
                                    {data.map((item) => {
                                        return (
                                            <Grid item xs={12} sm={6} md={4} lg={3} spacing={1} sx={{ margin: '20px 0 20px 0' }}>
                                                <Box sx={{ height: '150px', width: '250px' }} key={item.noteId} onClick={() => { handleClick(item.noteId) }}>
                                                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: `${item.color}`, backgroundImage: `${item.imageBg}`, backdropFilter: 'sepia(90%)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', width: '100%', position: 'relative' }} className="note">
                                                    <Typography variant="h5" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: `${props.color}`, fontFamily: "'Inconsolata', monospace", }}>{item.title}</Typography>
                                                        <Typography variant="h6" sx={{
                                                        whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 4,
                                                        WebkitBoxOrient: 'vertical',
                                                        maxHeight: '3.6em',
                                                        color: `${props.color}`,
                                                        fontFamily: "'Inconsolata', monospace",
                                                    }}>{item.description}</Typography>
                                                        <div style={{ height: '10px' }}></div>
                                                        <Typography variant="body2" sx={{
                                                        position: 'absolute',
                                                        bottom: 10,
                                                        width: '100%',
                                                        color: `${props.color}`,
                                                        fontFamily: "'Inconsolata', monospace",
                                                    }}>
                                                        {item.completed === true ? `Edited : ${item.date}` : `Created : ${item.date}`}
                                                    </Typography>
                                                    </Paper>
                                                </Box>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                }
                            </>
                        ) : (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px'
                            }}>
                                {showLoader ? (
                                    <h1>NO CONTENT</h1>
                                ) : (
                                    <HashLoader color='#f6ed22' size={100} />
                                )}

                            </Box>
                        )}
                    </Box>
                </Modal>
                <Dialog open={isDialogOpen} onClose={handleClose}>
                    <DialogTitle id="responsive-dialog-title">
                        <Typography variant='h5' textAlign={'center'}>
                            Attention !!!
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Notes will automatically be deleted after 30 days.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ padding: '20px' }}>
                        <Button onClick={handleRestore} variant='contained' color='primary'>
                            Restore
                        </Button>
                        <Button onClick={handleDelete} variant='contained' color='error'>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Tooltip>
        </div>
    );
}
