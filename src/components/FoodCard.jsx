import { PencilIcon, TrashIcon } from './icons'

function FoodCard({ image, title, description, onView, onEdit, onDelete, delay = 0 }) {
  return (
    <div
      onClick={onView}
      style={{ animationDelay: `${delay}ms` }}
      className="group bg-white rounded-3xl shadow-md overflow-hidden flex flex-col max-w-sm w-full cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-200/60 hover:-translate-y-2 animate-fade-in-up"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 text-left">
        <h2 className="text-xl font-bold text-gray-800 font-heading">{title}</h2>
        <p className="text-gray-600 text-sm mt-1 flex-1 line-clamp-3">{description}</p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2 justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/50 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <PencilIcon /> Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 hover:shadow-lg hover:shadow-red-300/50 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <TrashIcon /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
