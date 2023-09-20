import { useEffect, useState } from 'react';


export const getById = async (id) => {
    const url = `notes/getNote/${id}`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {

            const data = await response.json();
            console.log(data)

            return data !== null ? data : [];

        }
        else {
            throw new Error('Response is not valid JSON');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};


export default function EditNote(props) {
    // const [noteData, setNoteData] = useState(null);

    // useEffect(() => {
    //     getData(props.id)
    //         .then((data) => {
    //             setNoteData(data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, [props.id]);

    // console.log(noteData);
    // return noteData || {};
}
