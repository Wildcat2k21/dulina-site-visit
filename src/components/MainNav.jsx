import "./mainNav.css";

export default function MainNav(){
    return (
        <section className="main__nav-wrapper">
            <nav className="nav main__nav nav--main">
                <h2 className="nav__title iconed-title nav-main__title h-header h3-header">Навигация по сайту</h2>
                <ul className="nav__list">
                    <li><a href="#chapter-1">Почему саморазвитие дается так тяжело ?</a></li>
                    <li><a href="#chapter-2">Кто действительно определяет вашу судьбу ?</a></li>
                    <li><a href="#chapter-3">Закон притяжения, или почему рядом с нами оказываются не те люди ?</a></li>
                </ul>
            </nav>

            <nav className="nav main__nav nav--additional">
                <h2 className="nav__title iconed-title nav-additional__title h-header h3-header">Дополнительно</h2>
                <ul className="nav__list">
                    <li><a href="#day-card">🎴 Карта дня </a></li>
                    <li><a href="#psycho-alalyze">🎭 Какой у меня психотип ?</a></li>
                </ul>
            </nav>
        </section>
    );
}