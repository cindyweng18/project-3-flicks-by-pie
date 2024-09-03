import PropTypes from 'prop-types';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from 'styles/components/Tiles.module.scss';

SwiperCore.use([Navigation]);

const Tiles = ({ slidesPerView }) => (
  <Swiper
    spaceBetween={20}
    slidesPerView={1}
    slidesPerGroup={1}
    navigation
    breakpoints={{
      768: {
        slidesPerView: slidesPerView,
        slidesPerGroup: slidesPerView,
      },
    }}
    className={styles.tiles}
  >
    <SwiperSlide>
      <a href='https://nextjs.org/docs' className={styles.card}>
        <h3>Documentation &rarr;</h3>
        <p>Find in-depth information about Next.js features and API.</p>
      </a>
    </SwiperSlide>
    <SwiperSlide>
      <a href='https://nextjs.org/learn' className={styles.card}>
        <h3>Learn &rarr;</h3>
        <p>Learn about Next.js in an interactive course with quizzes!</p>
      </a>
    </SwiperSlide>
    <SwiperSlide>
      <a href='https://github.com/vercel/next.js/tree/master/examples' className={styles.card}>
        <h3>Examples &rarr;</h3>
        <p>Discover and deploy boilerplate example Next.js projects.</p>
      </a>
    </SwiperSlide>
    <SwiperSlide>
      <a
        href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        className={styles.card}
      >
        <h3>Deploy &rarr;</h3>
        <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
      </a>
    </SwiperSlide>
  </Swiper>
);

Tiles.propTypes = {
  slidesPerView: PropTypes.number,
};

export default Tiles;
