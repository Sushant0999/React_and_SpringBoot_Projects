package com.notes.keep.service;

import com.notes.keep.model.Notes;
import com.notes.keep.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotesService {
    private final NotesRepository notesRepository;

    @Autowired
    public NotesService(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    public Notes createNote(Notes note) {
        return notesRepository.save(note);
    }

    public List<Notes> notesList() {
        return notesRepository.findAll();
    }

    public Notes findByNoteId(Integer id){
        return notesRepository.findByNoteId(id);
    }

    public Notes updateNoteById(Integer id, Notes notes) {
        Notes oldNote = notesRepository.findByNoteId(id);
        oldNote.setColor(notes.getColor());
        oldNote.setDate(notes.getDate());
        oldNote.setTitle(notes.getTitle());
        oldNote.setDescription(notes.getDescription());
        notesRepository.save(oldNote);
        System.out.println(oldNote);
        return oldNote;
    }

    public void deleteById(Integer id){
         notesRepository.deleteById(id);
    }

}

