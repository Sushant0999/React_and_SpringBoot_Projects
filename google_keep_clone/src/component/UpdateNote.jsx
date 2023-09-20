import { useState } from "react";


export const getData = async (id, updatedData) => {
    const url = `notes/noteId/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log(data);
            return data !== null ? data : {};
        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};


export const NoteInfo = (props) => {
    const [noteData1, setNoteData1] = useState(null);

    useEffect(() => {
        getData(props.id)
            .then((data) => {
                setNoteData1(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [props.id]);

    console.log(noteData1);
    return noteData1 || {};
}
