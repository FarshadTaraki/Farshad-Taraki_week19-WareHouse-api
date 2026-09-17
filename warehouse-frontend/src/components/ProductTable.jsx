import styles from "./ProductTable.module.css";

function ProductTable({ products, isLoading, error, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className={styles.tableWrapper}>
        <p className={styles.status}>در حال دریافت اطلاعات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.tableWrapper}>
        <p className={styles.status}>دریافت اطلاعات محصولات با خطا مواجه شد.</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.tableWrapper}>
        <p className={styles.status}>محصولی پیدا نشد.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>

              <td>{product.quantity}</td>

              <td>
                {Number(product.price).toLocaleString("fa-IR")} هزار تومان
              </td>

              <td className={styles.id}>{product.id}</td>

              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => onEdit(product.id)}
                    title="ویرایش"
                  >
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 20H8L19 9C20.1 7.9 20.1 6.1 19 5C17.9 3.9 16.1 3.9 15 5L4 16V20Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M13.5 6.5L17.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </button>

                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(product.id)}
                    title="حذف"
                  >
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 7H19"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <path
                        d="M9 7V5H15V7"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <path
                        d="M7 7L8 20H16L17 7"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M10 11V16"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <path
                        d="M14 11V16"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
