import styles from "./../../styles/Headline.module.css";

const headLine = ({ headLine }) => {
  return (
    <div className={styles.headLinePage}>
      <img src={headLine.urlToImage} alt="" className={styles.image} />
      <h1 className={styles.title}>{headLine.name}</h1>
      <div className={styles.meta}>
        <p className={styles.author}>{headLine.author}</p>
        <p className={styles.source}></p>
        <p className={styles.publishedAt}>{headLine.publishedAt}</p>
      </div>
      <p className={styles.content}>{headLine.content}</p>
    </div>
  );
};

export default headLine;

export async function getServerSideProps(context) {
  const { params } = context;
  const { desc } = params;
  const queryParam = `q=${desc}&`;
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&${queryParam}apiKey=${process.env.API_KEY}`
  );
  const data = await response.json();
  const article = data.articles[0]; // Extract the first article from the array
  return {
    props: {
      headLine: article, // Pass the article as a prop to the component
    },
  };
}
