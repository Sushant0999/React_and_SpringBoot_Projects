import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const getByTitle = async (userId, query) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/userId/${userId}/${query}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // throw new Error('Network response was not ok');
            toast.error('Server Error', 1000);
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data !== null ? data : [];
        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default function SearchNote() {



    const [noteData, setNoteData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getByTitle();
                setNoteData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [noteData]);

    return noteData || null;
}
