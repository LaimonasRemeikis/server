import { useEffect, useState } from 'react';
import axios from 'axios';
import './bootstrap.css';
import './App.scss';
import Create from './components/Create';



function App() {

  
  const [trees, setTrees] = useState([]);

  const [createData, setCreateData] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:3003/trees-manager')
      .then(res => {
        console.log(res.data);
        setTrees(res.data);
      })
  }, []);

  useEffect(() => {
   if(null === createData){
     return
   }
   axios.post('http://localhost:3003/trees-manager', createData)
   .then(res => console.log(res));
  }, [createData]);



  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <Create setCreateData={setCreateData}></Create>
        </div>
        <div className="col-8">
          <div className="card m-4">
            <h2 className="card-header">
              Tree List
            </h2>
            <div className="card-body">
              <ul className="list-group">
                {
                  trees.filter(t => t.name !== 'Agrastas').map(t => <li className="list-group-item" key={t.id}>{t.name}</li>)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;