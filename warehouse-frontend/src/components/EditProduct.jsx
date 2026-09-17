import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { productSchema } from "../schemas/productSchema";

import styles from "./Modal.module.css";

function EditProduct({ product, onUpdate, onCancel, isPending }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),

    defaultValues: {
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    },
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>ویرایش اطلاعات</h2>

        <form className={styles.form} onSubmit={handleSubmit(onUpdate)}>
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
              {isPending ? "در حال ذخیره..." : "ثبت اطلاعات جدید"}
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

export default EditProduct;
