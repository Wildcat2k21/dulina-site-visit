import './styles/header.css';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const notices = [
  'Почему саморазвитие дается так тяжело ?',
  'Почему на меня не обращают внимание ?',
  'Нужно ли вообще саморазвитие ?',
  'Сложно сформулировать в чем именно я испытываю трудности',
  'Есть вещи, которые я не могу обсуждать с близкими',
  'Как преодолеть кризис ?',
  'Почему в жизни все не как в кино ?',
  'Почему мне не везет с партнерами ?',
  'Боюсь перемен в жизни',
  'Хочу быть смелее, но чувствую неуверенность',
  'Почему все вокруг кажутся такими успешными ?',
  'Почему мне кажется, что я упускаю свои возможности ?',
  'Почему саморазвитие дается так тяжело ?',
  'Кто действительно определяет вашу судьбу ?',
  'Закон притяжения, или почему рядом с нами оказываются не те люди ?',
  '🎭 Какой у меня психотип ?',
  '🎴 Карта дня ',
];

export default function Header() {
  const typedRef = useRef(null);
  const el = useRef(null);

  useEffect(() => {
    typedRef.current = new Typed(el.current, {
      strings: notices,
      typeSpeed: 40,
      backSpeed: 10,
      backDelay: 3000,
      loop: true,
      cursorChar: '|',
    });

    return () => {
      typedRef.current.destroy();
    };
  }, []);

  return (
    <header className="header">
      <div className="header__foreground"></div>
      <img
        className="header__lamps-image"
        src="./images/lamps.png"
        alt="header-icon"
      ></img>
      <div className="header__notice-wrapper">
        <h1 className="header__notice-main h-header h1-header">Узнайте</h1>
        <div className="header__notice-content">
          <span
            className="header__notice-info h-header h4-header"
            ref={el}
          ></span>
        </div>
      </div>
    </header>
  );
}
