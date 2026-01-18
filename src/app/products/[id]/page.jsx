import { getSingleProduct } from "@/actions/server/Product";
import CartButton from "@/components/Links/CartButton";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";


export async function generateMetadata({ params }) {
  const { id } = params;
  const product = await getSingleProduct(id);

  // Fallback if product not found
  if (!product) {
    return {
      title: "Product Not Found | Orvella",
      description: "The product you are looking for does not exist on Orvella.",
      openGraph: {
        title: "Product Not Found | Orvella",
        description: "The product you are looking for does not exist.",
        images: [
          {
            url: "https://i.ibb.co.com/hJbk51BM/image.png",
            width: 1200,
            height: 630,
            alt: "Orvella Fashion Store",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Product Not Found | Orvella",
        description: "The product you are looking for does not exist.",
        images: ["https://i.ibb.co.com/hJbk51BM/image.png"],
      },
    };
  }

  const {
    title,
    description,
    image,
    brand,
    category,
  } = product;

  return {
    title: `${title} | Orvella Fashion`,
    description:
      description?.slice(0, 160) ||
      "Shop premium fashion at Orvella. Quality clothing for men, women & kids with fast delivery.",
    keywords: [
      title,
      brand,
      category,
      "Orvella",
      "premium clothing",
      "men's fashion",
      "women's fashion",
      "kids clothing",
      "online shopping Bangladesh",
    ],
    openGraph: {
      title: title,
      description:
        description?.slice(0, 160) ||
        "Premium quality product from Orvella.",
      url: `https://orvella.vercel.app/products/${id}`,
      siteName: "Orvella Fashion Store",
      images: [
        {
          url: image || "https://i.ibb.co.com/bjYxg5HB/image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          url: "https://i.ibb.co.com/hJbk51BM/image.png",
          width: 1200,
          height: 630,
          alt: "Orvella Fashion Store",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description:
        description?.slice(0, 160) ||
        "Premium quality product from Orvella.",
      images: [image || "https://i.ibb.co.com/bjYxg5HB/image.png"],
    },
  };
}



const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product || !product.title) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Product Not Found</h1>
        <p className="text-gray-600 mt-4">The product you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  const {
    title = "",
    image = "",
    ratings = 0,
    reviews = 0,
    price = 0,
    finalPrice = 0,
    discount = 0,
    sold = 0,
    brand = "",
    description = "",
    category = "",
    subcategory = "",
    material = "",
    fit = "",
    sizes = [],
    colors = [],
    stock = 0,
    washCare = [],
    tags = [],
    currency = "BDT",
    gender = "",
    qna = [],
  } = product;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-500">
            <li><Link href="/" className="hover:text-red-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/products" className="hover:text-red-600">Products</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl shadow-sm p-6 lg:p-8">
          {/* Product Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                    <span className="text-sm">-{discount}%</span>
                  </div>
                </div>
              )}
              <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-600 transition-all">
                <FaHeart className="text-lg" />
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <FaTruck className="text-xl text-red-600 mb-1" />
                <span className="text-xs font-medium text-gray-700">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <FaShieldAlt className="text-xl text-red-600 mb-1" />
                <span className="text-xs font-medium text-gray-700">Secure Pay</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <FaUndo className="text-xl text-red-600 mb-1" />
                <span className="text-xs font-medium text-gray-700">Easy Return</span>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 mb-3">
              {brand && (
                <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                  {brand}
                </span>
              )}
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {category} / {subcategory}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {title}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  if (ratings >= starValue) {
                    return <FaStar key={i} className="text-amber-400" />;
                  } else if (ratings >= starValue - 0.5) {
                    return <FaStarHalfAlt key={i} className="text-amber-400" />;
                  } else {
                    return <FaRegStar key={i} className="text-gray-300" />;
                  }
                })}
              </div>
              <span className="text-sm font-medium text-gray-900">{ratings}</span>
              <span className="text-sm text-gray-400">({reviews} reviews)</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-600">{sold}+ sold</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                  ৳{finalPrice.toLocaleString()}
                </span>
                {discount > 0 && (
                  <span className="text-lg text-gray-400 line-through">
                    ৳{price.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  Save ৳{(price - finalPrice).toLocaleString()} ({discount}% off)
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {stock > 0 ? `In Stock (${stock} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Colors */}
            {colors && colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Color: <span className="font-normal text-gray-600">{colors[0]}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all text-sm font-medium"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {sizes && sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Size: <span className="font-normal text-gray-600">{sizes[0]}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size, index) => (
                    <button
                      key={index}
                      className="min-w-12 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all text-sm font-medium"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 bg-gray-50 font-medium min-w-[50px] text-center">1</span>
                  <button className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">({stock} available)</span>
              </div>

              {/* Main Action Buttons */}
              <div className="flex gap-3">
                <CartButton 
                  product={product} 
                  disabled={stock === 0} 
                  className="flex-1" 
                />
                
                <button className="px-6 py-4 border-2 border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center justify-center group">
                  <FaHeart className="text-lg group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaTruck className="text-red-600" />
                  <span>Free shipping over ৳1000</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaShieldAlt className="text-red-600" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaUndo className="text-red-600" />
                  <span>Easy 30-day returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Authentic products</span>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t pt-6 space-y-4">
              {/* Description */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Specifications</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Material</span>
                    <span className="font-medium text-gray-900">{material}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Fit</span>
                    <span className="font-medium text-gray-900">{fit}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Gender</span>
                    <span className="font-medium text-gray-900">{gender}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Brand</span>
                    <span className="font-medium text-gray-900">{brand}</span>
                  </div>
                </div>
              </div>

              {/* Care Instructions */}
              {washCare && washCare.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Care Instructions</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {washCare.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Q&A Section */}
              {qna && qna.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Q & A</h3>
                  <div className="space-y-3">
                    {qna.map((item, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4">
                        <p className="font-medium text-gray-900">{item.question}</p>
                        <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
