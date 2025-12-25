import React from 'react';
import styles from './FigmaFrame.module.css';

type FigmaFrameProps = {
  /** Size in pixels for width & height. Defaults to 160. */
  size?: number;
  /** Optional additional className to merge */
  className?: string;
};

/**
 * FigmaFrame (CSS Module variant)
 * Renders a rounded square with a black vertical gradient, subtle highlight and inset shadow.
 */
export default function FigmaFrame({ size = 160, className = '' }: FigmaFrameProps) {
  const style: React.CSSProperties = { width: size, height: size };

  return (
    <div data-node-id="4837:6242" className={`${styles.root} ${className}`} style={style}>
      <div className={styles.bg} />
      <div className={styles.highlight} />
      <div className={styles.insetShadow} />
    </div>
  );
}
