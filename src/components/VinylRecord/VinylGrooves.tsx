export default function VinylGrooves() {
  const grooveRadii = [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130];

  return (
    <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 280 280">
      <defs>
        <pattern id="grooves" patternUnits="userSpaceOnUse" width="4" height="4">
          <circle cx="2" cy="2" r="0.5" fill="#222" opacity="0.3" />
        </pattern>
      </defs>

      {/* Multiple concentric circles for vinyl groove effect */}
      {grooveRadii.map(radius => (
        <circle
          key={radius}
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="0.5"
          opacity="0.4"
        />
      ))}
    </svg>
  );
}
