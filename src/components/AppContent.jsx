import './appContent.css';

// Навигация на сайте
import MainNav from './MainNav.jsx';

// Об авторе
import AutorBio from './mainSections/AutorBio.jsx';

// Секции блога
import Chapter1 from './mainSections/Chapter1.jsx';
import Chapter2 from './mainSections/Chapter2.jsx';
import Chapter3 from './mainSections/Chapter3.jsx';

// Отзывы
import Feedbacks from './mainSections/Feedbacks';

// Подвал
import AppFooter from "./AppFooter.jsx";

export default function AppContent() {
    return (
        <main className="main">

            {/* Боковые декоративные элементы страницы */}
            <img src="./icons/cluxa-left.svg" className="cluxa cluxa-left" alt="left" />
            <img src="./icons/cluxa-right.svg" className="cluxa cluxa-right" alt="right" />

            <MainNav />

            <AutorBio />

            <Chapter1 />
            <Chapter2 />
            <Chapter3 />

            <section id="day-card">
                <h2 className='h2-header h-header'>🎴 Карта дня </h2>
                <p>(Уже скоро)</p>
            </section>

            <section id="psycho-alalyze">
                <h2 className='h2-header h-header'>🎭 Какой у меня психотип ?</h2>
                <p>(Уже скоро)</p>
            </section>
        
            <Feedbacks />
            <AppFooter />
        </main>
    )
}