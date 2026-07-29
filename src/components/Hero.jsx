import heroImg from '../assets/hero.png'

function Hero() {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-amber-100 to-amber-50 pt-6 pb-2">
      <div className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 bg-amber-300/40 blur-3xl animate-blob animate-float" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-72 h-72 bg-orange-300/40 blur-3xl animate-blob animate-float-slow" />

      <div className="relative max-w-6xl mx-auto px-4 animate-scale-in">
        <img
          src={heroImg}
          alt="Ninong Bai Recipe App"
          className="w-full h-auto max-h-105 object-cover rounded-3xl shadow-2xl"
        />
      </div>
    </div>
  );
}

export default Hero;
