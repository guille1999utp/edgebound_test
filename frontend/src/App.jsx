import { useEffect, useState } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

export default function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchPokemon = searchParams.get("pokemon");
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async() => {

    try {
      setLoading(true);
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1200`);
          
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }

          let data =  await response.json();
          
          data = data.results.filter(pokemon => pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase()));
          console.log(data);
          const pokemonResponse = data.map((pokemon) => {
            const urlPokemon = pokemon.url.split('/');
            const id = urlPokemon[urlPokemon.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

            return {
              ...pokemon,
              picture
            }

          })


          setPokemon(pokemonResponse);
          
    
    } catch (error) {
      console.error(error);
      setPokemon([]);
    }

    setLoading(false);

  };

  console.log(pokemon);
  useEffect(() => {
    
    fetchPokemon();

  }, [searchPokemon])

  return (
    <>
    <main className='p-5  m-auto' style={{maxWidth:"1440px"}}>
      
      <nav className="navbar"> 
        <form className="container-fluid d-flex" onSubmit={(e)=>{
          e.preventDefault();
          navigate(`/search?pokemon=${search}`)}
          }>
          <div className="input-group w-75">
            <span className="input-group-text" id="basic-addon1"><AiOutlineSearch /></span>
            <input type="text" className="form-control" onChange={(e)=>setSearch(e.target.value)} placeholder="Nombre del pokemon" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className='mt-3 mb-3 d-flex flex-row-reverse'>
          <button className="btn btn-outline-success bg-white" type="submit">search</button>
          </div>
        </form>
      </nav>

      {(!loading)?!(pokemon.length === 0)?
      <section className='mt-5 row row-cols-1  row-cols-lg-4 row-cols-sm-1 row-cols-md-2  g-4'>

        {pokemon.map(pokemon =>
        <div className='col' key={pokemon.name}>
          <div className="card" style={{width: "18rem"}} >
            <img src={pokemon.picture} className="card-img-top" alt="Foto pokemon" />
            <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
              <NavLink to={`/search/${pokemon.name}`} className="btn btn-primary">Ver mas</NavLink>
            </div>
          </div>
        </div>)}
          
        {/* <div className="card mb-3 mt-5" style={{maxWidth: "100%"}}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={pokemon.sprites.other.home.front_default} className="img-fluid rounded-start" alt="Foto pokemon" style={{width:"100%"}} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title fw-bold fs-1">{pokemon.name}</h5>

                <p className="card-text fs-4">Habilidades:</p>
                <ul>
                  {
                    pokemon.abilities.map((abilitie) =>
                    <li key={abilitie.ability.name}>
                      {abilitie.ability.name}
                    </li>)
                  }
                </ul>

                <p className="card-text fs-4">Peso: {pokemon.weight}</p>
                <ul>
                  {
                    pokemon.abilities.map((abilitie) =>
                    <li key={abilitie.ability.name}>
                      {abilitie.ability.name}
                    </li>)
                  }
                </ul>

                <p className="card-text fs-4">Habilidades:</p>
                <ul>
                  {
                    pokemon.abilities.map((abilitie) =>
                    <li key={abilitie.ability.name}>
                      {abilitie.ability.name}
                    </li>)
                  }
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </section>:
      <h2 className='text-center mt-5'>no hay pokemon</h2>:
      <h2 className='text-center mt-5'>Loading...</h2>}



      
    </main>
    </>
  )
}
