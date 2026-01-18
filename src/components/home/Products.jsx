import React from "react";
import ProductCard from "@/components/Cards/ProductCard";
import { getProducts } from "@/actions/server/Product";

const Products = async () => {
    const products = (await getProducts()||[]);
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-center text-3xl font-bold mb-10">
                Our Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
