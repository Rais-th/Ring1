"use client"

export function GradientBackground() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        backgroundImage: 'url(/Gradient.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  )
}
