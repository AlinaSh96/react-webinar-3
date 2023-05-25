import { memo, useState } from 'react';
import './style.css';

function LangSwitcher ({changeLang}) {
    const [lang, setLang] = useState('ru')

    const toggle = () => {
        setLang((lang) => lang === 'ru' ? 'en' : 'ru');
        console.log(lang)
        changeLang(lang);
    };

    return (
        <button
            className="LangSwitcher"
            onClick={toggle}
        >
            {lang}
        </button>
    );
}
export default memo(LangSwitcher);
