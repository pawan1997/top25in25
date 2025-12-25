interface ShaderBackdropProps {
  userId: string;
  size?: number;
}

export default function ShaderBackdrop({ userId: _userId }: ShaderBackdropProps) {
  return (
    <div className="gradient-bg absolute inset-0 rounded-full overflow-hidden">
      {/* Solid dark background */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(255, 255, 255, 0.05)' }}
      />
    </div>
  );
}
