import { useEffect, useState } from 'react';
import axios from 'axios';
import '../bootstrap.css';
import '../back.scss';
import Create from './Create';
import TreeLine from './TreeLine';
import Modal from './Modal';



function Back() {

  const [lastUpdate, setLastUpdate] = useState(Date.now()); // state nera prasmes keist i reduceri nes reiksme nekompleksine o buka
  
  const [trees, setTrees] = useState([]);
  

  const [createData, setCreateData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [modalData, setModalData] = useState(null);


 

  useEffect(() => {
    axios.get('http://localhost:3003/trees-manager')
      .then(res => {
        console.log(res.data);
        setTrees(res.data);
      })
  }, [lastUpdate]);

  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios.post('http://localhost:3003/trees-manager', createData)
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());
    });

  },[createData]);

  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios.put('http://localhost:3003/trees-manager/'+ editData.id, editData)
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());
    });

  },[editData]);

  useEffect(() => {
    if (null === deleteId) {
      return;
    }
    axios.delete('http://localhost:3003/trees-manager/' + deleteId.id, )
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());
    });

  },[deleteId])


  return (
    <>
     <div className="container">
      <div className="row">
        <div className="col-4">
          <Create setCreateData={setCreateData}></Create>
        </div>
        <div className="col-8">
          <div className="card m-2">
            <div className="card-header">
              <h2>Tree List</h2>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {
                  trees.map(t => <TreeLine key={t.id} tree={t} setDeleteId={setDeleteId} setModalData={setModalData}></TreeLine>)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal setEditData={setEditData} setModalData={setModalData} modalData={modalData}></Modal>
    </>
  );
}

export default Back;

// .filter(t => t.name !== 'Agrastas')