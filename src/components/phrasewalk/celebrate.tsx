const PIECES = Array.from({ length: 18 }, (_, i) => ({
  left: 6 + ((i * 53) % 88),
  delay: (i % 6) * 70,
  drift: ((i * 37) % 60) - 30,
  size: 6 + (i % 4) * 3,
  tone: i % 3,
}));

/** A short burst of paper bits. Purely decorative, hidden from screen readers. */
export function Celebrate() {
  return (
    <div className="confetti" aria-hidden="true">
      {PIECES.map((piece, index) => (
        <span
          key={index}
          className={`confetti-bit tone-${piece.tone}`}
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * 1.6,
            animationDelay: `${piece.delay}ms`,
            ["--drift" as string]: `${piece.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
