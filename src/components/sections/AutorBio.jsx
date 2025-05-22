import './styles/autorBio.css';

export default function AutorBio() {
  return (
    <section className="bio section">
      <div className="bio__leftside-content">
        <h3 className="h3-header h-header">Евгения Дулина</h3>
        <h4 className="h4-header h-header bio__speciality">Психология</h4>
        <img className="bio__autor-image" src="./images/dulina-evgenia.jpg" alt="autor" />
        <nav className="bio__contacts">
          <h4 className="h4-header h-header">Личный Telegram</h4>
          <ul className="bio__ul">
            <li>
              <a href="https://t.me/Dulina_Evgeniya" target="_blank">
                👉 @Dulina_Evgeniya
              </a>
            </li>
          </ul>

          <h4 className="h4-header h-header">Нумерология</h4>
          <ul className="bio__ul">
            <li>
              <a href="https://t.me/vseprostocifri" target="_blank">
                👉 ВСЕ ПРОСТО | Психология без мистики
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="bio__rightside-content quote">
        <span className="quote__bunk quote__bunk--top h1-header h-header">"</span>
        <p className="italic-text">
          Числа — это язык Вселенной, скрытый в датах и событиях вашей жизни. Они расскажут о ваших
          сильных сторонах, скрытых талантах и точках роста — нужно лишь уметь их расшифровать.
        </p>
        <p className="italic-text">
          Я помогаю людям через осмысленный анализ чисел и элементы психологии. Вместе мы разберем,
          какие энергии влияют на вашу жизнь, и найдем путь к внутреннему равновесию и уверенности в
          завтрашнем дне.
        </p>
        <span className="quote__bunk quote__bunk--bottom h1-header h-header">"</span>
      </div>
    </section>
  );
}
