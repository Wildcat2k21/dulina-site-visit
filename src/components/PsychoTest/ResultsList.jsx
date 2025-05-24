import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { psychotypes } from '@utils/psychotypes';

// Helper to compute scalar displacement
const computeDisplacement = ([dx, dy]) => Math.hypot(dx, dy);

// Determine base psychotype
function getBaseType(metrics) {
  const scores = {};
  Object.entries(psychotypes).forEach(([type, { thresholds }]) => {
    let count = 0;
    const { strokeWidth, letterHeight, lineSpacing } = thresholds;
    if (
      metrics.strokeWidth >= strokeWidth[0] &&
      metrics.strokeWidth <= strokeWidth[1]
    )
      count++;
    if (
      metrics.letterHeight >= letterHeight[0] &&
      metrics.letterHeight <= letterHeight[1]
    )
      count++;
    if (
      metrics.lineSpacing >= lineSpacing[0] &&
      metrics.lineSpacing <= lineSpacing[1]
    )
      count++;
    scores[type] = count;
  });
  // choose max
  return Object.keys(scores).reduce((a, b) => (scores[a] >= scores[b] ? a : b));
}

// Determine variation
function getVariation(base, metrics) {
  const variations = psychotypes[base].variations;
  return variations.find((v) => v.when(metrics)) || null;
}

export default function PsychoSolution({ results }) {
  const typedRef = useRef(null);

  // Extract metrics
  const charWH = results.find((r) => r.modelName === 'charWH')?.data || [];
  const charXY = results.find((r) => r.modelName === 'charXY')?.data || [];
  const lineWH = results.find((r) => r.modelName === 'lineWH')?.data || [];

  const metrics = {
    strokeWidth: charWH[0],
    letterHeight: charWH[1],
    displacement: computeDisplacement(charXY),
    lineSpacing: lineWH[1],
    strokeWidthDetail: charWH[0] * 25, // example scaling to 50-125
  };

  // Classification
  const base = getBaseType(metrics);
  const variation = getVariation(base, metrics);

  // Prepare text
  const typeInfo = psychotypes[base];
  const text = [];
  text.push(`Ваш психотип: ${base}`);
  text.push(typeInfo.description.trim());
  text.push(`Ключевые черты: ${typeInfo.traits.join(', ')}`);
  if (variation) {
    text.push(`Подтип: ${variation.name}`);
    text.push(variation.detail.trim());
  }
  const displayText = text.join('\n\n');

  // Typed.js effect
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [displayText],
      typeSpeed: 15,
      backSpeed: 0,
      showCursor: false,
    });
    return () => typed.destroy();
  }, [displayText]);

  return (
    <div className="psycho-solution">
      <h4 className="h-header h4-header psycho-solution__header">
        🔍 Ваш анализ
      </h4>
      <pre className="psycho-solution__text">
        <span ref={typedRef}></span>
      </pre>
    </div>
  );
}
