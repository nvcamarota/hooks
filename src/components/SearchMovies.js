import React, { useEffect, useState, useRef } from 'react';
import { UseFetch } from '../hooks/useFetch';

function SearchMovies() {

	const [movies, setState] = useState({ movie: [] });
	let [keyword, setSearch] = useState();

	useEffect(() => {
		UseFetch(`https://www.omdbapi.com/?s=${keyword}&apikey=f9b7c465`)
			.then(({ Search }) => {
				setState(Search);
				console.log(Search)
				setSearch(keyword);
			})
			.catch(() => console.error);
	}, []);

	let searcher = useRef();
	if (!localStorage.getItem('searcher')) {
		keyword = '';
	} else {
		keyword = localStorage.getItem('searcher');
	}

	const searching = () => {
		let result = searcher.current.value;
		let lStorage = (localStorage.setItem('searcher', result));
	}


	// Credenciales de API
	const apiKey = 'X'; // Intenta poner cualquier cosa antes para probar

	return (
		<div className="container-fluid">
			{
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* searcher */}
							<form method="get"  >
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input ref={searcher} type="text" className="form-control" />
								</div>
								<button onClick={searching} className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							{keyword == '' ? <h2>Escriba la película que busca.</h2> : <h2>Películas para la palabra: {keyword}</h2>}
						</div>
						{/* Listado de películas */}
						{
							keyword != '' && movies.length > 0 ? movies.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img
														className="img-fluid px-3 px-sm-4 mt-3 mb-4"
														src={movie.Poster}
														alt={movie.Title}
														style={{ width: '90%', height: '400px', objectFit: 'cover' }}
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							}) : keyword != '' && movies.length === undefined && <h2>Disculpa, la película que buscas no se encuentra.</h2>
						}
					</div>
				</>
			}
		</div>
	)
}
export default SearchMovies;
