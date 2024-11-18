import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const MyComponent = () => {
  const [response, error, loading, fetchData] = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchUrl = selectedCategory
      ? `/api/products/category?type=${selectedCategory}`
      : "/api/products";

    fetchData({
      method: "GET",
      url: fetchUrl,
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (response && Array.isArray(response.products)) {
      const filtered = response.products.filter((item) => {
        const matchesSearch = item.brand
          ? item.brand.toLowerCase().includes(searchTerm.toLowerCase())
          : false;
        return matchesSearch;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, response]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex gap-4 p-4 bg-gray-200">
        <input
          type="text"
          placeholder="Search by brand"
          className="p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="tv">TV</option>
          <option value="audio">Audio</option>
          <option value="laptop">Laptop</option>
          <option value="mobile">Mobile</option>
          <option value="gaming">Gaming</option>
          <option value="appliances">Appliances</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full bg-gray-500 gap-5 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              className="max-w-sm rounded-md shadow-lg bg-white"
              key={item.id}
            >
              <img
                className="w-full min-h-[250px] p-2 max-h-[250px] object-cover"
                src={item.image}
                alt={item.title}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 capitalize">
                  {item.brand && item.brand.length > 15
                    ? item.brand.slice(0, 15) + "..."
                    : item.brand}
                </div>
                <p className="text-gray-700 text-base">
                  {item.description && item.description.length > 25
                    ? item.description.slice(0, 25) + "..."
                    : item.description}
                </p>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <span className="text-gray-900 font-bold text-xl">
                  ${item.price}
                </span>
                {item.discount && (
                  <span className="text-red-500 font-bold text-lg">
                    -{item.discount}%  <span className="text-white ">${item.price - ((item.price / 100 ) * item.discount).toFixed(2)} OFF</span>
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default MyComponent;
