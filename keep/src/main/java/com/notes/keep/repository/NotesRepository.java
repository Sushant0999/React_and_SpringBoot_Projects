package com.notes.keep.repository;

import com.notes.keep.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Integer> {
    Notes findByNoteId(Integer id);

}

