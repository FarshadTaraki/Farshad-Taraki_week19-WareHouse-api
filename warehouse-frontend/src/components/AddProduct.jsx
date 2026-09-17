import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { productSchema } from "../schemas/productSchema";

import styles from "./Modal.module.css";

function AddProduct({ onAdd, onCancel, isPending }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),

    defaultValues: {
      name: "",
      quantity: 0,
      price: 0,
    },
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>ایجاد محصول جدید</h2>

        <form className={styles.form} onSubmit={handleSubmit(onAdd)}>
          <div className={styles.field}>
            <label>نام کالا</label>

            <input type="text" placeholder="نام کالا" {...register("name")} />

            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label>تعداد موجودی</label>

            <input
              type="number"
              placeholder="تعداد"
              {...register("quantity")}
            />

            {errors.quantity && (
              <span className={styles.error}>{errors.quantity.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label>قیمت</label>

            <input type="number" placeholder="قیمت" {...register("price")} />

            {errors.price && (
              <span className={styles.error}>{errors.price.message}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isPending}
            >
              {isPending ? "در حال ایجاد..." : "ایجاد"}
            </button>

            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
              disabled={isPending}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
