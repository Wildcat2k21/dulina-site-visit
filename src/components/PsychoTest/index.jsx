import './index.css';
import { useRef, useState } from 'react';
import NoticeBlock from './NoticeBlock.jsx';
import ResultsList from './ResultsList.jsx';
import { runAllModels } from '@utils/models.js';
import { openModal } from '@store/modalSlice';
import { useDispatch } from 'react-redux';

// -----------------------------------------------------
// Реактовый компонент (UI)
// -----------------------------------------------------
export default function PsychoTest() {
  const uploadFileRef = useRef(null);
  const [uploadedImgURL, setupLoadedImgURL] = useState('');
  const [results, setResults] = useState([]);

  const onButtonClick = () => uploadFileRef.current.click();
  const dispatch = useDispatch();

  const uploadHandler = async (e) => {
    if (results.length) {
      setResults([]);
    }

    const file = e.target.files?.[0];
    if (!file) return;
    setupLoadedImgURL(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = async () => {
      const imageUrl = reader.result;
      const res = await runAllModels(imageUrl, false); // <-- Бизнес-логика вынесена ниже

      // Получаем результаты классификатора
      const clsOut = res[0].data;
      const fixClsOut = clsOut.map((val) => Math.round(val));

      const [
        correct,
        shortText,
        badZoom,
        badOrient,
        badAngle,
        forceBlur,
        glimmer,
      ] = fixClsOut;

      let message = '';
      if (shortText === 1) {
        message = '🚫 Недостаточный объем текста для анализа';
      } else if (badZoom === 1) {
        message = '🚫 Маштаб снимка слишком близкий или далекий';
      } else if (badOrient === 1) {
        message = '🚫 Снимок повернут на 90 градусов';
      } else if (badAngle === 1) {
        message = '🚫 Угол снимка слишком крутой';
      } else if (forceBlur === 1) {
        message = '🚫 Снимок слишком размытый';
      } else if (glimmer === 1) {
        message = '🚫 Снимок слишком тусклый';
      } else if (correct === 1) {
        message = '✅ Изображение подходит для анализа';
      } else {
        message = '❓ Картинка не распознана';
      }

      dispatch(openModal(message));
      if (correct === 0) return;

      setResults(res);
    };
    reader.readAsDataURL(file);
  };

  const btnClass =
    'psycho-test__decorated-btn' +
    (uploadedImgURL ? ' psycho-test__decorated-btn--selected' : '');

  return (
    <div className="psycho-test">
      <NoticeBlock /> {/* UI-блок с требованиями к фото */}
      {uploadedImgURL && (
        <img
          className="psycho-test__uploaded-img"
          src={uploadedImgURL}
          alt="uploaded-img"
        />
      )}
      <button className={btnClass} onClick={onButtonClick}>
        {uploadedImgURL ? 'Выбрать другую 🔁' : 'Загрузить картинку'}
        <input
          type="file"
          accept="image/*"
          ref={uploadFileRef}
          onChange={uploadHandler}
          style={{ display: 'none' }}
        />
      </button>
      {results.length > 0 && <ResultsList results={results} />}
    </div>
  );
}
