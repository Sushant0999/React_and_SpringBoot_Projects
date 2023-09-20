import { Modal } from '@mui/material';
import React from 'react'

export const deleteById = async (id) => {
    const url = `notes/delete/${id}`
 
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default function DeleteNote() {
  return (
    <div>
      <Modal>
        <h1>DELETED</h1>
      </Modal>
    </div>
  )
}
