import recipeIcon from '../assets/recipe-icon.png'

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 group">
          <img
            src={recipeIcon}
            alt=""
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/60 shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
          />
          <h1 className="text-xl font-bold font-heading tracking-tight">Ninong Rey Recipe App</h1>
        </div>

        <nav>
          <ul className="flex gap-6 text-sm font-medium">
            {['Home', 'Recipes', 'About'].map((item) => (
              <li key={item} className="group relative">
                <a href="#" className="transition-colors duration-300 hover:text-amber-100">
                  {item}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
