// -----------------------------------------------------
// Бизнес-логика моделей
// -----------------------------------------------------
import * as tf from '@tensorflow/tfjs';

// Загрузка изображения в HTMLImageElement
export const loadImage = async (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

// Предобработка: resize, grayscale, normalize
// Порядок параметров: (img, height, width)
export const preprocessImage = (img, height, width) => {
  return tf.browser
    .fromPixels(img)
    .resizeNearestNeighbor([height, width])
    .mean(2)
    .expandDims(-1)
    .expandDims(0)
    .div(255.0);
};

// Запуск одной модели, возвращает данные
export const runSingleModel = async (
  modelName,
  height,
  width,
  img,
  debug = false,
) => {
  const url = `/ai-models/${modelName}/model.json`;
  const model = await tf.loadLayersModel(url);
  const tensor = preprocessImage(img, height, width);
  const prediction = model.predict(tensor);
  const data = Array.from(await prediction.data());
  if (debug) console.log(modelName, data);
  tf.dispose([tensor, prediction]);
  return { modelName, data };
};

// Запуск всех моделей
export const runAllModels = async (imageUrl, debug = false) => {
  const img = await loadImage(imageUrl);
  const configs = [
    { name: 'classifier', dims: [200, 200] },
    { name: 'charWH', dims: [200, 266] },
    { name: 'charXY', dims: [200, 266] },
    { name: 'fontClassifier', dims: [200, 266] },
    { name: 'lineWH', dims: [200, 266] },
  ];
  const res = [];
  for (const { name, dims } of configs) {
    res.push(await runSingleModel(name, dims[0], dims[1], img, debug));
  }
  return res;
};
