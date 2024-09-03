import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PieIcon from 'assets/pie.svg';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

function Home({ up_movies, movies, tv }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({ results: [] });

  const thumbs = [];
  const thumbs_movies = [];
  const thumbs_tv = [];
  const thumbs_main = [];

  const handleSubmit = (event) => {
    const fetchData = async () => {
      const result = await axios(
        "https://api.themoviedb.org/3/search/multi?api_key=" + process.env.API_KEY + "&language=en-US&query=" + search + "&page=1&include_adult=false"
      );
 
      setData(result.data);
    };
    fetchData();

    event.preventDefault();
  }

  up_movies.results.map((item) => (
    thumbs_main.push(
      <Link href={"/movie/" + item.id} passHref>
        <a href={"/movie/" + item.id}>
        <Image
          src={"https://image.tmdb.org/t/p/original" + item.poster_path} 
          alt={item.original_title}
          width={1400} 
          height={700} 
          layout="responsive"
        />
        </a>
      </Link>
    )))

  up_movies.results.map((item) => (
    thumbs.push(
      <SwiperSlide key={`thumb-${item.id}`} tag="li" style={{ listStyle: 'none' }}>
        <Link href={"/movie/" + item.id} passHref>
        <a href={"/movie/" + item.id}>
        <Image
          src={"https://image.tmdb.org/t/p/original" + item.poster_path} 
          alt={item.original_title}
          width={200} 
          height={200} 
          layout="fixed"
        />
        </a>
        </Link>
        <a href={"/movie/" + item.id} class="text-decoration-none">
        <p class="text-white bg-dark"> {item.original_title} </p>
        </a>
      </SwiperSlide>
    )))

    movies.results.map((item) => (
      thumbs_movies.push(
        <SwiperSlide key={`thumb-${item.id}`} tag="li" style={{ listStyle: 'none' }}>
          <Link href={"/movie/" + item.id} passHref>
          <a href={"/movie/" + item.id}>
          <Image
            src={"https://image.tmdb.org/t/p/original" + item.poster_path} 
            alt={item.original_title}
            width={200} 
            height={200} 
            layout="fixed"
          />
          </a>
          </Link>
          <a href={"/movie/" + item.id} class="text-decoration-none">
          <p class="text-white bg-dark"> {item.original_title} </p>
          </a>
        </SwiperSlide>
      )))

      tv.results.map((item) => (
        thumbs_tv.push(
          <SwiperSlide key={`thumb-${item.id}`} tag="li" style={{ listStyle: 'none' }}>
            <Link href={"/tv/" + item.id} passHref>
            <a href={"/tv/" + item.id}>
            <Image
              src={"https://image.tmdb.org/t/p/original" + item.poster_path} 
              alt={item.original_title}
              width={200} 
              height={200} 
              layout="fixed"
            />
            </a>
            </Link>
            <a href={"/tv/" + item.id} class="text-decoration-none">
            <p class="text-white bg-dark"> {item.name} </p>
            </a>
          </SwiperSlide>
        )))

  return (
    <React.Fragment>
      <Head>
        <title>Flicks PIE</title>
        <link rel='icon' href='/favicon.ico' />
        <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet" />
      </Head>

      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <PieIcon />
          </a>

            <Button variant="primary" onClick={handleShow} class="btn btn-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header close>
                <Modal.Title>
                <form onSubmit={handleSubmit}>
                  <input class="form-control me-2" name="search" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" aria-label="Search" />
                </form>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {data.results.map(item => (
                <div class="bg-dark text-white">
                  <Link href={"/movie/" + item.id} passHref>
                  <a href={"/" + item.media_type +"/" + item.id} class="text-decoration-none">
                  <Image src={"https://image.tmdb.org/t/p/original" + item.poster_path} alt={item.original_title} width={100} height={100} layout="fixed" />
                  <p key={item.id} class="text-white bg-dark"> {item.original_title} </p>
                  </a>
                  </Link>
                </div>
                ))}
              </Modal.Body>
            </Modal>
        </div>
      </nav>
      
    <div class="container-fluid bg-dark text-white">
      {thumbs_main[0]}

      <div class="row">
        <h2> Upcoming </h2>
        <Swiper
          id="thumbs"
          thumbs={{ swiper: thumbsSwiper }}
          controller={{ control: controlledSwiper }}
          tag="section"
          wrapperTag="ul"
          navigation
          pagination
          spaceBetween={6}
          slidesPerView={6}
          onInit={(swiper) => console.log('Swiper initialized!', swiper)}
          onSlideChange={(swiper) => {
            console.log('Slide index changed to: ', swiper.activeIndex);
          }}
          onReachEnd={() => console.log('Swiper end reached')}
        >
          {thumbs}

        </Swiper>
      </div>

      <div class="row">
        <h2> Movies </h2>
        <Swiper
          id="thumbs"
          thumbs={{ swiper: thumbsSwiper }}
          controller={{ control: controlledSwiper }}
          tag="section"
          wrapperTag="ul"
          navigation
          pagination
          spaceBetween={6}
          slidesPerView={6}
          onInit={(swiper) => console.log('Swiper initialized!', swiper)}
          onSlideChange={(swiper) => {
            console.log('Slide index changed to: ', swiper.activeIndex);
          }}
          onReachEnd={() => console.log('Swiper end reached')}
        >
          {thumbs_movies}

        </Swiper>
      </div>
      
       <div class="row">
        <h2> TVs </h2>
        <Swiper
          id="thumbs"
          thumbs={{ swiper: thumbsSwiper }}
          controller={{ control: controlledSwiper }}
          tag="section"
          wrapperTag="ul"
          navigation
          pagination
          spaceBetween={6}
          slidesPerView={6}
          onInit={(swiper) => console.log('Swiper initialized!', swiper)}
          onSlideChange={(swiper) => {
            console.log('Slide index changed to: ', swiper.activeIndex);
          }}
          onReachEnd={() => console.log('Swiper end reached')}
        >
          {thumbs_tv}

        </Swiper>
      </div>
    </div>

      <footer class="text-muted py-3 bg-dark text-white">
        <div class="container-fluid bg-dark text-white">
          <p class="float-end mb-1">
            Movie data provided by &nbsp; 
            <Image src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" width={50} height={50} layout="fixed" />
          </p>
          <p> &copy; 2021 PIE LLC</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Home;

export async function getStaticProps() {
  const url_upcoming = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + process.env.API_KEY
  const res_upcoming = await fetch(url_upcoming)
  const up_movies = await res_upcoming.json()

  const url_movies = 'https://api.themoviedb.org/3/trending/movie/week?api_key=' + process.env.API_KEY
  const res_movies = await fetch(url_movies)
  const movies = await res_movies.json()

  const url_tv = 'https://api.themoviedb.org/3/trending/tv/week?api_key=' + process.env.API_KEY
  const res_tv = await fetch(url_tv)
  const tv = await res_tv.json()

  return {
    props: {
      up_movies,
      movies,
      tv,
    },
  }
}