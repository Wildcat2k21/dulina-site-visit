import './index.css';
import { useRef, useState } from 'react';

export default function PsychoTest() {
  const uploadFileRef = useRef(null);
  const [fileIsSelected, setFileIsSelected] = useState(false);

  const decBtnClickHand = () => {
    uploadFileRef.current.click();
  };

  const uploadHandler = (event) => {
    // image from event to base64 URL
    const file = event.target.files[0];
    setFileIsSelected(true);
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const selectedFileClassName =
    'psycho-test__decorated-btn' +
    (fileIsSelected ? ' psycho-test__decorated-btn--selected' : '');

  return (
    <div className="psycho-test">
      <div className="psycho-test__notice">
        <p>
          <b>🎭 Проверка психотип по подчерку</b>
          <br />
          Подчерк может многое сказать о человеке, проверка психотипа будет
          происходить с использованием глубоко обученных нейросетей и
          алгоритмов.
        </p>
        <p>
          <b>📢 Фотография должна быть</b>
        </p>
        <ul>
          <li>
            Тетрданый лист (не снимок тетради целиком), в клетку или линию
          </li>
          <li>Фотография по центру c заполнением области</li>
          <li>Лист заполнен хотя-бы на половину</li>
          <li>Хорошее освщение, отсутствие размытия</li>
        </ul>
      </div>
      <button className={selectedFileClassName} onClick={decBtnClickHand}>
        {fileIsSelected ? 'Выбрать другую 🔁' : 'Загрузить картинку'}
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={uploadHandler}
          ref={uploadFileRef}
        />
      </button>
    </div>
  );
}
