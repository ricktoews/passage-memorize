import { Inter } from '@next/font/google'
import React, { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

const menuItems = [
  { title: 'The Raven', url: 'https://memorize.toewsweb.net/rest.php/getpassage/The%20Raven' },
  { title: 'The Walrus and the Carpenter', url: '' },
  { title: 'Composed Upon Westminster Bridge', url: 'https://memorize.toewsweb.net/rest.php/getpassage/Westminster%20Bridge' },
  { title: 'To Autumn', url: '' }
]

const passageTitlesUrl = 'https://memorize.toewsweb.net/rest.php/titlematches/passages';

export default function Home() {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ passageTitle, setPassageTitle ] = useState('No Title Selected');
  const [ passageTitles, setPassageTitles ] = useState([]);
  const [ passageText, setPassageText ] = useState([]);
  const [ passageBlockNdx, setPassageBlockNdx ] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await (await fetch(passageTitlesUrl)).json();
      const menuItems = result.map((item: string) => ({ title: item, url: `https://memorize.toewsweb.net/rest.php/getpassage/${item}`}));
      setPassageTitles(menuItems);
    })()
  }, []);

  const handleMenu = (e: React.MouseEvent<EventTarget>) => {
    setIsOpen(!isOpen);
  }

  interface PassageItem {
    title: string;
    url: string;
  }

  const checkForLocal = (title: string) => {
    const key = 'memorize-the-raven';
    if (!localStorage.hasOwnProperty(key)) return false;

    const passage = localStorage[key].split("\n\n");
    console.log(passage);
    setPassageTitle(title);
    setPassageText(passage);
    return true;    
  }

  const retrievePassage = async (url: string, title: string) => {
    if (checkForLocal(title)) return;

    const passage = await (await fetch(url)).json();
    setPassageText(passage);
    setPassageTitle(title);
  }

  const handleGetPassage = (e: React.MouseEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLElement)) return;
    const el = e.target;
    const dataset: DOMStringMap = el.dataset;
    const { url = '', title = ''} = dataset;
    setIsOpen(false);
    retrievePassage(url, title);
  }

  const nextBlock = () => {
    if (passageBlockNdx < passageText.length - 1) {
      setPassageBlockNdx(passageBlockNdx + 1);
    }
    else {
      setPassageBlockNdx(0);
    }
  }

  const prevBlock = () => {
    if (passageBlockNdx > 0) {
      setPassageBlockNdx(passageBlockNdx - 1);
    } else {
      setPassageBlockNdx(passageText.length - 1);
    }
  }

  return (
    <div>

      <div className="fixed top-0 w-full h-fit bg-gray-400 text-black flex justify-center">

        <span className="text-lg">{passageTitle}</span>
        <div className="absolute right-0 h-full cursor-pointer" onClick={handleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex">
            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
          </svg>
        </div>
{ isOpen && (
        <div className="absolute top-7 right-0 h-screen w-fit bg-gray-300 bg-opacity-90">
          <div className="bg-gray-800 bg-opacity-100 text-white">
            <ul className="list-none">
              { passageTitles.map((item: PassageItem, key: number) => (
                <li key={key} data-title={item.title} data-url={item.url} onClick={handleGetPassage} className="cursor-pointer p-1 border-b-black border">{item.title}</li>
              ))}
            </ul>
          </div>
        </div>
)}
      </div>


      <div className="fixed h-14 w-full bottom-0 bg-gray-400 text-black"></div>
      <div onClick={prevBlock} className="cursor-pointer fixed h-14 w-14 bottom-0 left-4 bg-gray-400 text-black">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-full">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
        </svg>
      </div>
      <div onClick={nextBlock} className="cursor-pointer fixed h-14 w-14 bottom-0 right-4 bg-gray-400 text-black">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-full">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="mt-4 mb-10 text-6xl text-center p-2 leading-relaxed font-memorize">
        { passageText.length > 0 ? passageText[passageBlockNdx] : null }
      </div>
  </div>
  )
}
