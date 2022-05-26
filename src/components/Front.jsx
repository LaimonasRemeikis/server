import TreeLine from "./Front/TreeLine";
import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import '../bootstrap.css';
import '../front.scss'
import reducer from "../Reducers/reducer";
import { getDataFromServer, sortClientHeightAsc, sortClientHeightDesc,  sortClientNameAsc, sortClientNameDesc } from "../Actions";

function Front({show}) {

    // const [trees, setTrees] = useState([]);

    const [lastUpdate, setLastUpdate] = useState(Date.now());// state
    const [trees, dispachTrees] = useReducer(reducer, [])
    const[search, setSearch]= useState ('');
    // const [com, setCom] = useState([])


    // Read
    useEffect(() => {
        axios.get('http://localhost:3003/trees-list/' + show)
            .then(res => {
                console.log(res.data);
                // const t = new Map(); //medziai
                // const c = new Map(); //komentarai
                // res.data.forEach(o => {
                //     t.set(o.id, o);
                //     if (null !== o.cid) {
                //         c.set(o.cid, o);
                //     }
                // });
                // const ar = [];
                // t.forEach(o => ar.push(o));
                // const ar2 = [];
                // c.forEach(o => ar2.push(o));
                // setCom(ar2);
                dispachTrees(getDataFromServer(res.data));
            })
    }, [show, lastUpdate]);

  

    const serverSort = (by, dir) => {
        axios.get('http://localhost:3003/trees-list-sorted/?dir='+ dir + '&by=' + by)
        .then(res => {
            dispachTrees(getDataFromServer(res.data));
        });
    }

   const doSearch = e => {
    setSearch(e.target.value);
    axios.get('http://localhost:3003/trees-list-search/?s='+ e.target.value)
    .then(res => {
        dispachTrees(getDataFromServer(res.data));
    });
}

const saveVote = (id, value) => {
    axios.post('http://localhost:3003/trees-vote/' + id, {vote: value})
    .then(res => {
        setLastUpdate(Date.now());
    });
}
const saveComment = (id, value) => {
    axios.post('http://localhost:3003/trees-comment/' + id, {comment: value})
    .then(res => {
        setLastUpdate(Date.now());
    });
}

return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Tree Shop</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link" to="/">Home</Link>
                                <Link className="nav-link" to="/leaf">Leaf</Link>
                                <Link className="nav-link" to="/spike">Spike</Link>
                                <Link className="nav-link" to="/palm">Palm</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {
                            trees.map(t => <TreeLine key={t.id} tree={t} saveVote={saveVote} saveComment={saveComment} ></TreeLine>)
                        }
                    </ul>
                </div>
            </div>
        </div>
        <div className="container mt-4">
            <div className="row">
                <div className="col-2">
                    <span>By name <small>server</small>:</span>
                    <div className="arrows">
                    <svg className="up" onClick={() => serverSort('title', 'asc')}>
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    <svg className="down"  onClick={() => serverSort('title', 'desc')}>
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    </div>
                </div>
                <div className="col-2">
                    <span>By height <small>server</small>:</span>
                    <div className="arrows">
                    <svg className="up"  onClick={() => serverSort('height', 'asc')}>
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    <svg className="down"  onClick={() => serverSort('height', 'desc')}>
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    </div>
                </div>
                <div className="col-2">
                    <span>By name <small>client</small>:</span>
                    <div className="arrows">
                    <svg className="up" onClick={() => dispachTrees(sortClientNameAsc())}>
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    <svg className="down"  onClick={() => dispachTrees(sortClientNameDesc())}>
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    </div>
                </div>
                <div className="col-2">
                    <span>By height <small>client</small>:</span>
                    <div className="arrows">
                    <svg className="up"  onClick={() => dispachTrees(sortClientHeightAsc())}>
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    <svg className="down"  onClick={() => dispachTrees(sortClientHeightDesc())}>
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    </div>
                </div>
                <div className="col-2">
                <div className="form-group">
                    <label>search</label>
                    <input type="text" className="form-control" onChange={doSearch} value={search} />
                    <small className="form-text text-muted">Add new tree name here.</small>
                </div>
                </div>
            </div>
        </div>
    </>

)
}

export default Front;