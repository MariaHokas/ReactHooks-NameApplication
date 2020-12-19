
import './App.css'
import LogingUseState from './state'
import LoginUserReducer from './useReducer'
import DataFetching from './DataFetchingWirhReducer'
import Count from './count';
import ShoppingList from './useReducerAddDelete';
import AddLuokka from './addLuokka';
import NewTry from './NewTry';
import NameFetch from './NameFetch';

function App() {
  return (
    <div className="App">
<LogingUseState />
<br/>
<LoginUserReducer />

<hr/>
{/* <DataFetching /> */}
<hr/>
<Count />
<hr/>
<ShoppingList />
<hr/>
{/* <AddLuokka /> */}
<hr/>
{/* <RedCon />
<hr/> */}
<NewTry />
<hr/>
<hr/>
<hr/>
<NameFetch />
<hr/>
<hr/>
<hr/>
<hr/>

    </div>
  );
}

export default App;
