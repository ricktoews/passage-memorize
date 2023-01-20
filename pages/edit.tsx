import React, { useEffect, useState } from "react"

export default function Edit() {
    const [ passageTitle, setPassageTitle ] = useState('The Raven');
    const [ passageText, setPassageText ] = useState('');
    const [ localTitle, setLocalTitle ] = useState('memorize-the-raven');

    useEffect(() => {

        if (localStorage.hasOwnProperty(localTitle)) {
            const passage = localStorage[localTitle];
            setPassageTitle(passageTitle);
            setPassageText(passage);
        }

        else {
            const passageUrl = `https://memorize.toewsweb.net/rest.php/getpassage/The%20Raven`;
            (async () => {
                const result = await (await fetch(passageUrl)).json();
                let changeable = result.join("\n\n");
                setPassageTitle('The Raven');
                setPassageText(changeable);
            })()      
            }
    }, [])

    const handleTextChange = (e: React.SyntheticEvent) => {
        if (!(e.target instanceof HTMLTextAreaElement)) return;
        const el = e.target;
        localStorage.setItem(localTitle, el.value);
    }
    return (
        <>
        <div className="p-5">

            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{passageTitle}</label>
            <textarea id="message" rows="16"  onChange={handleTextChange} className="block leading-8 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={passageText}></textarea>

        </div>
        </>
    )
}