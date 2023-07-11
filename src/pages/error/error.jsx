import styles from "./error.module.css";

function ErrorPage() {
  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large">Ошибка 404</h1>
      <p className="text text_type_main-medium text_color_inactive mt-8">Страница не найдена</p>
    </section>
  );
};

export default ErrorPage;