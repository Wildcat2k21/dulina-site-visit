import Header from '@components/Header.jsx';
import PageNav from '@components/PageNav.jsx';
import AutorBio from '@sections/AutorBio.jsx';
import Chapter1 from '@sections/Chapter1.jsx';
import Chapter2 from '@sections/Chapter2.jsx';
import Chapter3 from '@sections/Chapter3.jsx';
import TarotSketch from '@tarotSketch';
import PsychoTest from './components/PsychoTest';
import Feedbacks from '@sections/Feedbacks.jsx';
import AppFooter from '@components/AppFooter.jsx';
import ModalContainer from './components/ModalContainer';
import './animations.css';
import './app.css';

import { modifyByReverse } from '@tarotSketch/helpers.js';
import { tarotDescriptions } from '@utils/tarot.js';

function getElementByDay(arr) {
  const today = new Date();
  const dayms = 1000 * 60 * 60 * 24;
  const shift = dayms * 1;
  const dayIndex = Math.floor((today.getTime() + shift) / dayms);
  return arr[dayIndex % arr.length];
}

function App() {
  const modifiedTarotProperties = modifyByReverse(tarotDescriptions);
  const dayCard = getElementByDay(Object.values(modifiedTarotProperties));
  const cardDescription = dayCard.reverseFlag
    ? dayCard.reversed
    : dayCard.streight;

  return (
    <div className="app">
      <ModalContainer />
      <Header />
      <main className="main">
        {/* Боковые декоративные элементы страницы */}
        <img
          src="/icons/cluxa-left.svg"
          className="cluxa cluxa-left"
          alt="left"
        />
        <img
          src="/icons/cluxa-right.svg"
          className="cluxa cluxa-right"
          alt="right"
        />

        <PageNav />
        <AutorBio />
        <Chapter1 />
        <Chapter2 />
        <Chapter3 />

        <section id="day-card" className="day-card">
          <h2 className="h2-header h-header day-card__header">🎴 Карта дня </h2>
          <div className="day-card__sketch">
            <span className="day-card__description">{cardDescription}</span>
            <TarotSketch dayCard={dayCard} />
          </div>
        </section>

        <section id="psycho-alalyze">
          <h2 className="h2-header h-header">🎭 Какой у меня психотип ?</h2>
          <PsychoTest />
        </section>

        <Feedbacks />
        <AppFooter />
      </main>
    </div>
  );
}

export default App;
