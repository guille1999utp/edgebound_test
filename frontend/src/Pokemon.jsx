import { useEffect, useState } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

export default function Pokemon() {
  const params = useParams();

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  const Pokemon = async() => {

    try {
      setLoading(true);
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`);
          
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }

          const data =  await response.json();
          setPokemon(data);
          
    
    } catch (error) {
      console.error(error);
      setPokemon([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    
    Pokemon()

  }, [params])
  

  return (
    <>
    <main className='p-5  m-auto' style={{maxWidth:"1440px"}}>

      {(!loading)?!(pokemon.length === 0)?<section>
        <div className="card mb-3 mt-5" style={{maxWidth: "100%"}}>
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

                <p className="card-text fs-4">stats:</p>
                <ul>
                  {
                    pokemon.stats.map((stat) =>
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>)
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>:<h2 className='text-center mt-5'>no hay pokemon</h2>:<h2 className='text-center mt-5'>Loading...</h2>}
    </main>
    </>
  )
}
