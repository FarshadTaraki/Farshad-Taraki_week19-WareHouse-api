import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Search from "./Search";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productServices";

import { useAuth } from "../contexts/AuthContext";

import styles from "./AdminPanel.module.css";

function AdminPanel() {
  const [searched, setSearched] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;

  const [deletingModal, setDeletingModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", page, searched],
    queryFn: () => getProducts(page, limit, searched),
  });

  const products = productsData?.data ?? [];
  const totalPages = productsData?.totalPages ?? 1;

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSearch = (value) => {
    setSearched(value);
    setPage(1);
  };

  const handleEdit = async (id) => {
    try {
      const product = await getProductById(id);
      setEditingProduct(product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setDeletingModal(true);
  };

  const closeDeleteModal = () => {
    if (deleteMutation.isPending) return;

    setDeletingModal(false);
    setDeletingId(null);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      if (products.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      }

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setDeletingModal(false);
      setDeletingId(null);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const addMutation = useMutation({
    mutationFn: addProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setIsAdding(false);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setEditingProduct(null);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const previousPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const nextPage = () => {
    setPage((currentPage) => Math.min(totalPages, currentPage + 1));
  };

  return (
    <div className={styles.page} dir="rtl">
      <header className={styles.header}>
        <Search searched={searched} setSearched={handleSearch} />

        <div className={styles.userSection}>
          <div className={styles.avatar}>ف</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>فـرشـاد تـارکـی</span>

            <span className={styles.userRole}>مدیر</span>
          </div>

          <div className={styles.headerDivider} />

          <button
            className={styles.logoutButton}
            onClick={logoutHandler}
            title="خروج"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 17L15 12L10 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M15 12H3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <path
                d="M21 3V21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.titleRow}>
          <div className={styles.title}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <path
                d="M8 8H16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />

              <path
                d="M8 12H16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />

              <path
                d="M8 16H13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <h1>مدیریت کالا</h1>
          </div>

          <button
            className={styles.addButton}
            onClick={() => setIsAdding(true)}
          >
            افزودن محصول
          </button>
        </div>

        <ProductTable
          products={products}
          isLoading={isLoading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        <div className={styles.pagination}>
          <button onClick={previousPage} disabled={page === 1 || isLoading}>
            ‹
          </button>

          <span className={styles.currentPage}>{page}</span>

          <button onClick={nextPage} disabled={page >= totalPages || isLoading}>
            ›
          </button>
        </div>
      </main>

      {isAdding && (
        <AddProduct
          onAdd={addMutation.mutate}
          onCancel={() => setIsAdding(false)}
          isPending={addMutation.isPending}
        />
      )}

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onUpdate={(data) =>
            updateMutation.mutate({
              id: editingProduct.id,
              data,
            })
          }
          onCancel={() => setEditingProduct(null)}
          isPending={updateMutation.isPending}
        />
      )}

      {deletingModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.deleteModal}>
            <div className={styles.deleteIcon}>
              <span>×</span>
            </div>

            <p className={styles.deleteText}>
              آیا از حذف این محصول اطمینان دارید ؟
            </p>

            <div className={styles.deleteActions}>
              <button
                className={styles.cancelButton}
                onClick={closeDeleteModal}
                disabled={deleteMutation.isPending}
              >
                لغو
              </button>

              <button
                className={styles.confirmDeleteButton}
                onClick={() => deleteMutation.mutate(deletingId)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "در حال حذف..." : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
