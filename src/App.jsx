import Header from './components/Header.jsx';
import './app.css';
import TarrotSketch from "./components/TarrotSketch-p5";

// Навигация на сайте
import PageNav from './components/PageNav.jsx';

// Об авторе
import AutorBio from './components/MainSections/AutorBio.jsx';

// Секции блога
import Chapter1 from './components/MainSections/Chapter1.jsx';
import Chapter2 from './components/MainSections/Chapter2.jsx';
import Chapter3 from './components/MainSections/Chapter3.jsx';

// Отзывы
import Feedbacks from './components/MainSections/Feedbacks.jsx';

// Подвал
import AppFooter from "./components/AppFooter.jsx";


function App() {
  return (
    <div className="app">
      <Header />
        <main className="main">

            {/* Боковые декоративные элементы страницы */}
            <img src="./icons/cluxa-left.svg" className="cluxa cluxa-left" alt="left" />
            <img src="./icons/cluxa-right.svg" className="cluxa cluxa-right" alt="right" />

            <PageNav />
            <AutorBio />
            <Chapter1 />
            <Chapter2 />
            <Chapter3 />

            <section id="day-card">
                <h2 className='h2-header h-header'>🎴 Карта дня </h2>
                <div className='day-card__sketch'>
                  <TarrotSketch />
                </div>
            </section>

            <section id="psycho-alalyze">
                <h2 className='h2-header h-header'>🎭 Какой у меня психотип ?</h2>
                <p>(Уже скоро)</p>
            </section>
        
            <Feedbacks />
            <AppFooter />
        </main>
    </div>
  )
}

export default App
