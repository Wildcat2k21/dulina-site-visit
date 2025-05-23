import './styles/feedbacks.css';

export default function Feedbacks() {
  return (
    <section className="reviews section">
      <h3 className="h3-header h-header reviews__title">Отзывы</h3>
      <div className="reviews__list">
        <div className="reviews__item">
          <img className="reviews__image" src="./images/revier2.png" />
          <span className="review__name">Марина</span>
          <img className="reviews__stars-mac" src="./images/stars.png" />
          <p className="review__feedback">
            Обратилась в сложный период, когда казалось, что всё рушится.
            Евгения не росто дала ответы на мои вопросы — она помогла увидеть
            ...
          </p>
        </div>

        <div className="reviews__item">
          <img className="reviews__image" src="./images/revier3.png" />
          <span className="review__name">Анна</span>
          <img className="reviews__stars-mac" src="./images/stars.png" />
          <p className="review__feedback">
            Все очень понравилось 🤗🌹, буду следить за осуществлением
            прогноза✨
          </p>
        </div>

        <div className="reviews__item">
          <img className="reviews__image" src="./images/revier1.png" />
          <span className="review__name">Екатерина</span>
          <img className="reviews__stars-mac" src="./images/stars.png" />
          <p className="review__feedback">
            Очень понравилась консультация! Получила ответы на все вопросы!
            Обязательно приду еще! 🙏 ❤️
          </p>
        </div>
      </div>
    </section>
  );
}
