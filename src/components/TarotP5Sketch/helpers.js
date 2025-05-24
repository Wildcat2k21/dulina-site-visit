export const getViewportProportions = () => {
  const viewprop = window.innerHeight / window.innerWidth;
  return viewprop > 1 ? 1 : viewprop;
};

export const calcTarotSketchSize = (parentRef, scale = 1) => {
  const viewPortProportions = getViewportProportions();

  if (parentRef) {
    const width = parentRef.offsetWidth * scale;
    const height = width * viewPortProportions;
    return { width, height };
  }
};

export const ResizeTarotSketch = (parentRef, scale = 1) => {
  return (p5) => {
    const { width, height } = calcTarotSketchSize(parentRef.current, scale);
    p5.resizeCanvas(width, height);
  };
};

export const modifyByReverse = (cardProperties) => {
  const newCardProps = {};

  for (let key in cardProperties) {
    newCardProps[key] = {
      ...cardProperties[key],
      reverseFlag: false,
    };

    const reversedPrefix = '--reversed';
    newCardProps[key + reversedPrefix] = {
      ...cardProperties[key],
      reverseFlag: true,
    };
  }

  return newCardProps;
};
