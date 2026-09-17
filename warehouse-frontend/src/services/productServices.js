import api from "./config";

export const getProducts = async (page, limit, searched) => {
  const res = await api.get(
    `/products?page=${page}&limit=${limit}&name=${searched}`,
  );

  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);

  return res.data;
};

export const addProduct = async (data) => {
  const res = await api.post("/products", data);

  return res.data;
};

export const updateProduct = async ({ id, data }) => {
  const res = await api.put(`/products/${id}`, data);

  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);

  return res.data;
};
