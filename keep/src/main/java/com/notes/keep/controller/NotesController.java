package com.notes.keep.controller;

import com.notes.keep.model.Notes;
import com.notes.keep.service.NotesService;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notes")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @PostMapping("/add")
    public ResponseEntity<?> createNote(@RequestBody Notes note) {
        Loggers.info("CALLED CREATE NOTES");
        System.out.println(note);
        return ResponseEntity.ok(notesService.createNote(note));
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllNotes() {
        Loggers.info("CALLED GET ALL NOTES");
        return ResponseEntity.ok(notesService.notesList());
    }

    @GetMapping("/getNote/{id}")
    public ResponseEntity<?> getNoteById(@PathVariable Integer id) {
        Loggers.info("CALLED GET NOTES BY ID");
        return ResponseEntity.ok(notesService.findByNoteId(id));
    }

    @PutMapping("/noteId/{id}")
    public ResponseEntity<?> updateNoteById(@PathVariable Integer id, @RequestBody Notes notes) {
        Loggers.info("CALLED PUT MAPPING");
        return ResponseEntity.ok(notesService.updateNoteById(id, notes));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        Loggers.info("CALLED AFTER DELETE");
        notesService.deleteById(id);
        Loggers.info("CALLED BEFORE DELETE");
        return ResponseEntity.ok().build();
    }


}
