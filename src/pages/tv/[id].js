import { useRouter } from 'next/router'
import Image from 'next/image'
import PieIcon from 'assets/pie.svg';
import Head from 'next/head';

const Detail = (details) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>Flicks PIE</title>
        <link rel='icon' href='/favicon.ico' />
        <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet" />
      </Head>

      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <PieIcon />
          </a>
        </div>
      </nav>

      <div class="card mb-3 bg-dark text-white">
        <div class="row no-gutters">
          <div class="col-md-4">
            <Image class="card-img-top" src={"https://image.tmdb.org/t/p/original" + details.details.poster_path} alt={details.details.original_title} width={450} height={550} layout='fixed' />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{details.details.name}</h5>
              <p class="card-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                </svg>
                &nbsp;
                {details.details.vote_average}/10   
                &emsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg> 
                &nbsp;     
                {details.details.first_air_date}
              </p>
              <p class="card-text">{details.details.overview} </p>
            </div>
          </div>
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
    </>
  )
}

export async function getStaticPaths() {
    const url = 'https://api.themoviedb.org/3/trending/tv/week?api_key=' + process.env.API_KEY;
    const res = await fetch(url);
    const posts = await res.json()
  

    const paths = posts.results.map((post) => ({
      params: { id: post.id.toString() },
    }))
  
    return { paths, fallback: false }
  }

export async function getStaticProps({params}) {
    const url = 'https://api.themoviedb.org/3/tv/' + params.id + '?api_key=' + process.env.API_KEY;
    const res = await fetch(url);
    const details = await res.json();
  
    return {
      props: {
        details,
      },
    }
  }

export default Detail