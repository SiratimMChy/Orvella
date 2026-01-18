import Link from 'next/link';
import { FaMale, FaFemale, FaChild } from 'react-icons/fa';

const categories = [
  {
    title: 'Men Wear',
    value: 'Men',
    path: '/men',
    icon: <FaMale size={40} />,
    bgImage: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500',
  },
  {
    title: 'Ladies Wear',
    value: 'Ladies',
    path: '/ladies',
    icon: <FaFemale size={40} />,
    bgImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500',
  },
  {
    title: 'Kids Wear',
    value: 'Kids',
    path: '/kids',
    icon: <FaChild size={40} />,
    bgImage: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
  },
];

const CategoryCards = () => {
  return (
    <div className="w-full px-2 lg:px-0 py-8">
      <h2 className="text-center text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <Link
            key={cat.value}
            href={cat.path}
            className="relative group w-full shadow-lg rounded-xl overflow-hidden h-80 border border-gray-200 hover:shadow-2xl transition-all duration-300"
            style={{
              backgroundImage: `url(${cat.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300"></div>
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 h-full">
              <div className="text-white bg-red-600 rounded-full flex items-center justify-center w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <h3 className="font-bold text-2xl text-white drop-shadow-lg">
                {cat.title}
              </h3>
              <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Shop Now →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
